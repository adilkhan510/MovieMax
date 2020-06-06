const db = require('../model/user');
const db2 = require('../model/favorite')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const register = async (req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        const existingUser = await db.User.findOne({email : email});
         // Find the existing user;
        if(existingUser){
            res.status(400).json({
                error : "User with this email already exists"
            })
        }
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            firstName,
            lastName,
            email,
            password : hashedPassword
        }
        // Creating New User
        db.User.create(user,(err,userData)=>{
            if(err) console.log(err);
            res.status(200).json({
                data : userData
            })
        })
    } catch(err){
        console.log(err)
    }
};

const login = async (req,res)=>{
    try{
        const { email, password } = req.body;
        console.log(email, password)
        const existingUser = await db.User.findOne({email : email});
        if(!existingUser){
            return res.status(400).json({
                error : "Invalid email or Password"
            })
        };
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).json({
                error : "Invalid Email or Password"
            })
        }
        // Send back the token to the frontend. We will use this to verify the user whenever making requests from the frontend
        const token = jwt.sign({id : existingUser._id},process.env.JWT_TOKEN)
        return res.status(201).json({
            token,
            email : existingUser.email,
            id : existingUser._id,
            name : existingUser.firstName
        })
    } catch(err){
        return res.status(400).json({
            error: "Something went wrong while logging in."
        })
    }
}

const getUserInfo = (req,res)=>{
    auth(req,res,()=>{
        db.User.findById(req.user,(error,foundUser)=>{
            if(error) return console.log(error);
            res.json({
                status: 200,
                data: foundUser,
                requestedAt: new Date().toLocaleString()
            });
        });
    })
}

const getFavorites = async (req,res)=>{
    try{
        const movie = await db2.Favorites.find({movieId : req.body.movieId});
        console.log(movie)
        if(!movie){
            return res.status(400).json({
                error : "Nothing exists"
            })
        };
        console.log(movie.length)
        return res.status(200).json({
            success : true,
            data : movie.length
        })
    }catch(err){
        return res.status(400).json({
            error: "Something went wrong."
        })
    }
}

const addToFavorites =(req,res)=>{
    db2.Favorites.create(req.body,(err,addedToFavorites)=>{
        if(err) return res.status(400).json({
            err: err
        })
        res.status(200).json({
            data : addedToFavorites
        })
    })
}

module.exports ={
    register,
    getUserInfo,
    login,
    getFavorites,
    addToFavorites
}