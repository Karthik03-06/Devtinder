const express=require('express')
const userRouter=express.Router();
const ConnectionRequestModel=require('../models/connectionRequest')
const {userAuth}=require('../middlewares/auth');
const User=require('../models/user');
const USER_DATA="firstName lastName age gender about";
userRouter.get('/user/request/pending',userAuth, async (req,res)=>{

    try{
        const loggedinuser=req.user;
        const connectionRequests=await ConnectionRequestModel.find({
            toUserId:loggedinuser._id,
            status:"Interested"
        }).populate("fromUserId",USER_DATA);

        if(connectionRequests.length==0){
            return res.json({message:"No Request Found!!"});
        }
        return res.json({message:"Data Fetched Sucessfully",connectionRequests});
        
        


    }
    catch(err){
        res.status(404).send("Error " + err.message);
    }


})

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedinuser=req.user;

        const connectionRequest=await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedinuser._id,status:"Accepted"},
                {toUserId:loggedinuser._id,status:"Accepted"},
            ]
        }).populate("fromUserId",USER_DATA).populate("toUserId",USER_DATA);

        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()==loggedinuser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        if(data.length==0){
            return res.json({message:"No Accepted Connections Found!!"});
        }
        res.json({message:"Data Fetched Sucessfully",data});
    }
    catch(err){
        res.status(400).send("Error "+err.message);
    }
});
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        const loggedinuser=req.user;
        const page=req.query.page || 1;
        let limit=req.query.limit || 10;


        limit=limit>50?50:limit;
        const skip=(page-1)*limit;

        const connectionRequest=await ConnectionRequestModel.find({
            $or:[{fromUserId:loggedinuser._id},
                {toUserId:loggedinuser._id}]
        }).select("fromUserId toUserId");

        const hideUsers=new Set();
        connectionRequest.forEach(req=>{
            hideUsers.add(req.fromUserId._id);
            hideUsers.add(req.toUserId._id);

        })


        const users=await User.find({
            $and:[{_id:{$nin: Array.from(hideUsers)}},
                {_id:{$ne:loggedinuser._id}},
            ]
        }).select(USER_DATA).skip(skip).limit(limit);
        res.send(users);
    }

    catch(err){
        res.status(400).send("Error "+err.message);
    }
})
module.exports=userRouter;