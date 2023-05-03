const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const databaseUsername   = process.env.SMOOTHIE_MONGODB_USERNAME 
const databasePassword  = process.env.SMOOTHIE_MONGODB_PASSWORD 


const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

//database connection
const dbURI = `mongodb+srv://${databaseUsername }:${databasePassword}@mern.kfn22jx.mongodb.net/node-auth`; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }) //3 object in 2nd argument to prevent any mongoDB errors (review later)
  .then((result) =>{
    console.log('Connected to MongoDB')
    app.listen(3000)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home')); //render home.ejs
app.get('/smoothies', (req, res) => res.render('smoothies')); 