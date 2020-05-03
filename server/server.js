// Imports 
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

// -----Connect to the database
mongoose.connect(config.mongoURI,{useNewUrlParse: true}).then(()=>{
    console.log("Database connected")
}).catch((error)=>{
    console.log(error)
})

// ----setting up middleware 
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cookieParser())

// ---- Setting up server to listen on port 5000
app.listen(5000)