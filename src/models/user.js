const mongoose=require("mongoose");
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address"+ value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is Too weak! Please enter another password"+value);
            }
        }

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

const User = mongoose.model("User",userSchema);

module.exports=User;