const express=require('express');
const ProfileRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const {validatePassword}=require("../models/user");
const {validateProfileEdit, validateExisting}=require('../utils/validator');
const bcrypt=require('bcrypt');


ProfileRouter.get("/profile/view", userAuth,async (req,res)=>{
    try{
        
       const user=req.user;
        
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }

})
ProfileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    
    try{
        if(!validateProfileEdit(req)){
            throw new Error("Invalid Edit Request !" );
        }
        const user= await req.user;

        Object.keys(req.body).forEach((key)=> user[key]=req.body[key]);

        await user.save();
        res.json({
            message:`${user.firstName} , your Profile Updated Sucessfully`,
            data:user,
        });


    }
    catch(err){
        res.status(400).send("Error " +err.message)
    }

})
ProfileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    console.log(req.body);
    try{
        if(!validateExisting(req)){
            throw new Error("Please Enter the Correct Old Password!!");
        }

        const user=await req.user;
        
        const passwordHash=await bcrypt.hash(req.body.password,10);
        console.log(user.password);

        user.password=passwordHash;
        await user.save();
        console.log(user.password);

        res.send("Password Updated Succesfully");
        
    }
    catch(err){
        res.status(400).send("Error "+err.message);
    }
})
module.exports=ProfileRouter;

