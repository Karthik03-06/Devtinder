const mongoose=require("mongoose");

const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        unique:true,
        // index:true,
        minLength:4,
        maxLength:20
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        trim:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid Email Address"+ value);
        //     }
        // }
    },
    password:{
        type:String,
        required:true,
        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error("Password is Too weak! Please enter another password"+value);
        //     }
        // }

    },
    age:{
        type:String
    },
    about:{
        type:String,
        default:"This is About the User!"
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error ("Gender is not Valid");
        }
    }
    },
    
    
},{
    timestamps:true
})
userSchema.methods.getJWT = async function(){

    const user=this;

    const token=await jwt.sign({_id:user._id},"Dev@tinder758",{expiresIn:"1d"});
    return token;
}
userSchema.methods.validatePassword= async function(passwordInput){
    const user=this;
    const passwordHash=user.password;

    const isValidPassword=await bcrypt.compare(passwordInput,passwordHash);

    return isValidPassword;
}
const User = mongoose.model("User",userSchema);

module.exports=User;