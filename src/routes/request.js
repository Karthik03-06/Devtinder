const express=require('express');

const RequestRouter=express.Router();

const {userAuth}=require('../middlewares/auth');
const User=require('../models/user')

const ConnectionRequestModel=require('../models/connectionRequest');
RequestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message:"User Not found!!"})
        }
        const Allowed=["Interested","Ignore"];
        if(!Allowed.includes(status)){
            return res.status(400).json({
                message:"Invalid Status Type " + status})
        }
        if(fromUserId.toString()===toUserId.toString()){
            return res.status(404).json({message:"Cannot Send Connection Request to Yourself"})
        }
        
        const Existing= await ConnectionRequestModel.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
        }
        );
        if(Existing){
            return res.status(400).json({message:"Connection Aldready Sent"})
        }
        const ConnectionRequest=new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        })

        const data=await ConnectionRequest.save();

        res.json({message:"Connection Sent Successfully ",data})
    }
    catch(err){
        res.status(400).send("Error "+err.message);
    }
})

module.exports=RequestRouter;