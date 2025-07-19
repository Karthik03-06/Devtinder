const validator=require('validator');
const user=require('../models/user');
const {validatePassword}=require("../models/user");


const validatorSignupdata=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName){
        throw new Error("Name is Not Valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is Not Valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is Too Weak! Please try another password");
    }
}

const validateProfileEdit=(req)=>{
    const Allowed=["age","gender","firstName","about","lastName"];

    const isAllowed=Object.keys(req.body).every((field)=> Allowed.includes(field));

    return isAllowed; 
}
const validateExisting=async(req)=>{
    const ExistingPassword=req.body.Existing;
    const user=req.user;
    
    const isValidPassword=await user.validatePassword(ExistingPassword);
    return isValidPassword;
}
module.exports={
    validatorSignupdata,
    validateProfileEdit,
    validateExisting,
}