const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        maxLength = 50,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        minLength : 5
    },
    lastName : {
        type : String,
        maxLength : 60,
    },
    token : {
        type : String
    }
})


const User = mongoose.Model("User", userSchema)

module.exports = {
    User
}