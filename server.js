// Imports 
const express = require('express')
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://adilkhan:nicepassword@movie-app-pdiud.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParse: true}).then(()=>{
    console.log("Database connected")
}).catch((error)=>{
    console.log(error)
})



// Setting up server to listen on port 5000
app.listen(5000)