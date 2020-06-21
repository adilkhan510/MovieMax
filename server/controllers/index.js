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
                success : true,
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
        console.log(req.body)
        console.log("req came in....",email, password)
        const existingUser = await db.User.findOne({email : email});
        console.log(existingUser)
        if(!existingUser){
            console.log("user does not exist...")
            return res.status(400).json({
                error : "Invalid email or Password"
            })
        };
        const isMatch = await bcrypt.compare(password, existingUser.password);
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({
                error : "Invalid Email or Password"
            })
        }
        // Send back the token to the frontend. We will use this to verify the user whenever making requests from the frontend
        const token = await jwt.sign({id : existingUser._id},process.env.JWT_TOKEN)
        console.log("creating token....", token)
        return res.status(201).json({
            token,
            email : existingUser.email,
            id : existingUser._id,
            name : existingUser.firstName
        })
    } catch(err){
        return res.status(400).json({
            error: "Something went wrong while logging in.",
            err : err
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

// Get all favorites
const getFavorites = async (req,res)=>{
    const userId = req.body.id
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
            length : movie.length
        })
    }catch(err){
        return res.status(400).json({
            error: "Something went wrong."
        })
    }
}

// User adding to favorites.
const addToFavorites = async (req,res)=>{
    try{
        const user = {
            user : req.user,
            movieId : req.body.movieId,
            movieTitle : req.body.movieTitle,
            movieImage : req.body.movieImage
        }
        console.log("user....",req.user)
        const foundDoc = await db2.Favorites.findOne({user : req.user, movieId : req.body.movieId})
        console.log(foundDoc, "........document deleted")
        if(!foundDoc){
            console.log("cant find the document so creating it")
            db2.Favorites.create(user);
            return res.status(200).json({
                success : true,
                data : user
            })
        }else{
            const deleted_doc = await db2.Favorites.findByIdAndDelete(foundDoc._id);
            console.log("what i deleted....", deleted_doc )
            return res.status(200).json({
                deleted : true,
                data : deleted_doc
            })
        }
        // (err,foundDoc)=>{
        //     console.log("found doc", foundDoc)
        //     if(foundDoc){
        //         db2.Favorites.deleteOne(user,(err,deletedUser)=>{
        //             if(err) return res.status(400).json({
        //                 err
        //             })
        //             return res.status(200).json({
        //                 deleted : true,
        //             })
        //         })
        //     }else{
        //         console.log("adding to favorites")
        //         db2.Favorites.create(user,(err,favoritedMovie)=>{
        //             if(err) return res.status(400).json({
        //                 err
        //             })
        //             res.status(200).json({
        //                 success: true,
        //                 data : favoritedMovie
        //             })
        //     })
        //     }
        // });
    }catch(err){
        return res.status(400).json({
            error: "Something went wrong."
        })
    }
}
// Get user favorites 
const getUserFavorites = async (req,res)=>{
    const user = req.user
    console.log(user)
    try{

        const movies = await db2.Favorites.find({user : user});
        console.log(movies)
        if(!movies){
            return res.status(400).json({
                error : "User has not added any movies to the favorites"
            })
        };
        console.log(movies)
        return res.status(200).json({
            success : true,
            movieList : movies
        })
    }catch(err){
        return res.status(400).json({
            error: "Something went wrong.",
            err
        })
    }
}


module.exports ={
    register,
    getUserInfo,
    login,
    getFavorites,
    addToFavorites,
    getUserFavorites
}