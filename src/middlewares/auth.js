const jwt= require('jsonwebtoken');
const User=require('../models/user');

const userAuth=async (req,res,next)=>{
    try{
        const cookie=req.cookies;

        const {Token}=cookie;
        if(!Token){
            throw new Error("Token is Not Valid!!");
        }
        const decoded=await jwt.verify(Token,"Dev@tinder758");
        
        const {_id}=decoded;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User Not Valid!!");

        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("Error "+err.message);
    }

}
module.exports={
    userAuth,
};