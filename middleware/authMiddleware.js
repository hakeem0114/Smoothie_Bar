const jwt = require('jsonwebtoken') //Create cookies
const User = require('../models/User');

//Create a new custom middleware
    //Checks authentication status
const requireAuth = (req, res, next)=>{ //middlwares always have those 3 arguments
    const token = req.cookies.jwt //jwt from browser>application

    //Check if JWT (JSON Web TOken) exists & if verified
    if(token){
        jwt.verify(token, 'hakeem secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next() // Move onto next middleware in App.js after cookie parser middleware
                      //which is /home & /smoothies
            }
        })
    }else{
        //No token so redirect to login page
        res.redirect('/login')
    }
}

//Check current user
const checkUser = (req, res, next)=>{ 
    const token = req.cookies.jwt //Get user's token from browser
    
    if(token){
        jwt.verify(token, 'hakeem secret', async (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                
                res.locals.user = null //Set it to null since this value will be checked continuously

                next()
            }else{
                console.log(decodedToken) //Decoded JWT has payload= contains user's id

                let user = await User.findById(decodedToken.id)

                //Pass valid & current user into ejs views & display its properties 
                res.locals.user = user

                next() 
            }
        })
    }else{
        res.locals.user = null
        next()
    }


}

module.exports = {
    requireAuth,
    checkUser
};