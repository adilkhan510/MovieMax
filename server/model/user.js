const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name : {
        type : String,
        maxLength : 50,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        minLength : 5
    },
    token : {
        type : String
    }
})


const User = mongoose.model("User", userSchema)

module.exports = {
    User
}