const express = require('express');
const mongoose = require('mongoose');

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

app.use(authRoutes) //Lets you use 