const jwt = require('jsonwebtoken');

// Everytime a logged in user wants to do something that requires sending a request to the backend it will go thru the auth function

const auth = (req,res,next)=>{

    try{
        // First get the token.
        const token = req.header("token")
        const verified = jwt.verify(token,process.env.JWT_TOKEN);
        console.log(verified)
        if(!verified){
            return res.status(401).json({
                error : "Token verification failed, auth denied"
            })
        }
        // Add a user to the request, the token will have a id object.
        req.user = verified.id;
        next();
    } catch(err){
        return res.status(400).status({
            error : "something went wrong"
        })
    }
}


module.exports = auth