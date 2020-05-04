const jwt = require('jsonwebtoken');

const auth = async (req,res,next)=>{
    try{
        const token = req.header("token")
        const verified = jwt.verify(token,process.env.JWT_TOKEN);
        if(!verified){
            return res.status(401).json({
                error : "Token verification failed, auth denied"
            })
        }
        req.user = verified.id;
        next();
    } catch(err){
        return res.status(400).status({
            error : "something went wrong"
        })
    }

}