const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});



// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  console.log('User about to be created & saved', this);
  
  //Hash the password using bcrypt
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next(); //Run function after middleware is done executing
});

// fire a function after doc saved to db
// userSchema.post('save', function (doc, next) {
//   console.log('new user was created & saved', doc);
//   next();
// });


//.method = in-built mongoose methods. .statics = making new methods with old methods in them.
//Static method to login user. Let's you call User.login() later
userSchema.statics.login = async function(email, password){

  //this = User from database
  //Check if email is in database
  const user = await this.findOne({email})

  //If user exits,
  if(user){
    //Compare passwords
    const auth = bcrypt.compare(password, user.password) //true if pass

    if(auth){
      return user 
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email') //Handle error
}

const User = mongoose.model('user', userSchema);

module.exports = User;