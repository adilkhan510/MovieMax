const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const saltRounds = 10
const userSchema = mongoose.Schema({
    firstName : {
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
    lastName : {
        type : String,
        maxLength : 60,
    },
    token : {
        type : String
    }
})

// userSchema.pre('save', ( next )=>{
//     let user = this;
//     if(user.isModified('password')){
//         bcrypt.genSalt(saltRounds,(err,salt)=>{
//             if(err) return next(err)

//             bcrypt.hash(user.password,salt,(err,hash)=>{
//                 if(err) return next(err);
//                 user.password = hash
//             })
//         })
//     }else{
//         next()
//     }
// })


const User = mongoose.model("User", userSchema)

module.exports = {
    User
}