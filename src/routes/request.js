const express=require('express');

const RequestRouter=express.Router();

const {userAuth}=require('../middlewares/auth');

RequestRouter.post("/sendconnection",userAuth,async(req,res)=>{
    res.send(req.user.firstName + " send you a Connection request");
})

module.exports=RequestRouter;