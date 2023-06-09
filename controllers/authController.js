const User = require("../models/User");
const jwt = require('jsonwebtoken') //URL safe with cookies to server to verify user


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //incorrect email 
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
    return errors;
  }

  //incorrect password 
  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
    return errors;
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3*24*60*60 //3days x(24hrs/1day)x(60mins/1hr)x(60s/1min) => minutes


//Create JWT variable
const createToken  = (id) =>{
  return jwt.sign({id}, 'hakeem secret', {
    expiresIn: maxAge
  }) //payload, secret & automatically added header from jwt
}


// SignUp
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  //JWT for user
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id) //User id from database

    res.cookie('jwt',token, {
                              httpOnly: true, 
                              maxAge: maxAge * 1000
                            }
                )  //httpOnly = can only be accessed on server


    res.status(201).json({user: user._id});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}


//Login

module.exports.login_get = (req, res) => {
  res.render('login');
}


module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.login(email, password)

    //Create login JWT
    const token = createToken(user._id) //User id from database
    res.cookie('jwt',token, {
                              httpOnly: true, 
                              maxAge: maxAge * 1000
                            }
                )  //httpOnly = can only be accessed on server

    res.status(200).json({user: user._id})//User id from database
  }
  catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

//Logout
module.exports.logout_get = async (req, res)=>{
  //Remove the JWT cookie by replacing it with another 
  //cookie with a short expiry date

  res.cookie('jwt', '', {
                httpOnly: true,
                maxAge: 1
            })

  // res.cookie('jwt',token, {
  //                             httpOnly: true, 
  //                             maxAge: maxAge * 1000
  //                           }
  //               )  //httpOnly = can only be accessed by a 3rd party client-server


   //Redirect to homepage, once logged out
   res.redirect('/login')
  
}