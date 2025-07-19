const express=require('express');
const ProfileRouter=express.Router();
const {userAuth}=require('../middlewares/auth');

ProfileRouter.get("/profile", userAuth,async (req,res)=>{
    try{
        
       const user=req.user;
        
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }

})

module.exports=ProfileRouter;