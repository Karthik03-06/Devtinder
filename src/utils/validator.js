const validator=require('validator');
const validatorSignupdata=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is Not Valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is Not Valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is Too Weak! Please try another password");
    }
}
module.exports={
    validatorSignupdata,
}