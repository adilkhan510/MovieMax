// Imports 
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { User } = require('./model/user')

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

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userData)=>{
        if(err) return res.json({
        success : false,
        err
        })
        res.status(200).json({
            success : true,
            data : userData
        })
    })

})

// ---- Setting up server to listen on port 5000
app.listen(5000)