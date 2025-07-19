const express=require('express');
const authRouter=express.Router();
const User=require("../models/user.js");

const {validatorSignupdata}=require('../utils/validator.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.post("/signup",async(req,res)=>{
    try{
        validatorSignupdata(req);
        const {firstName,lastName,emailId,password}=req.body;

        const passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
        res.send("User added Sucessfully");
    }
    catch(err){
        res.status(400).send("Error in saving data " + err.message);
    }
})

authRouter.post("/login",async (req,res)=>{

    try{

        const {emailId,password}=req.body;
        // console.log(req.body);

        const user=await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid Credentials!!");
        }

        const isValidPassword=await user.validatePassword(password);


        if(isValidPassword){

           const token=await user.getJWT();
            res.cookie("Token",token,{expires:new Date(Date.now()+8*3600000)});
            res.send("Login Successfull");
        }
        else{
            throw new Error("Password is not Correct");
        }
        
        

    }
    catch(err){
        res.status(400).send("Error "+err.message)
    }
})

authRouter.post("/logout",async (req,res)=>{
    
        res.cookie("Token",null,{
            expires:new Date(Date.now()),
        })
        res.send("Logut Sucessfull!!");
    
    
})

module.exports=authRouter;