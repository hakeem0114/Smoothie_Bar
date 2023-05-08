const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


//Import express routes & .use() then in the main app
const authRoutes = require('./routes/authRoutes')

//Hide keys
require('dotenv').config()
const databaseUsername   = process.env.SMOOTHIE_MONGODB_USERNAME 
const databasePassword  = process.env.SMOOTHIE_MONGODB_PASSWORD 

//Start main express App
const app = express();

// middleware
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({
  extended:true
}))

app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');


//database connection
const dbURI = `mongodb+srv://${databaseUsername }:${databasePassword}@mern.kfn22jx.mongodb.net/node-auth`; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }) //3 objects in 2nd argument to prevent ensure you are using the current mongoDB function calls 
  .then((result) =>{
    console.log('Connected to MongoDB')
    app.listen(3000)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home')); //get main local host url & render home.ejs
app.get('/smoothies', (req, res) => res.render('smoothies'));  //Get smoothies ejs file & render it

app.use(authRoutes) 


// cookies


app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false); //Browser's default cookie is changed from true to true
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); 
  //maxAge = time till cookie expires, httpOnly = cookie details only available in server, secure: only available on https

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(req.cookies)
  console.log(cookies.newUser);

  res.json(cookies); //Send response to browser

});