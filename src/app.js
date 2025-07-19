const express=require("express")
const connectDB=require("./config/database.js")
const app=express();
const User=require("./models/user.js");
const {validatorSignupdata}=require('./utils/validator.js')
const {userAuth}=require('./middlewares/auth.js');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken')

app.use(express.json());
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
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
app.post("/sendconnection",userAuth,async(req,res)=>{
    res.send(req.user.firstName + " send you a Connection request");
})
app.get("/user/:userId", async (req,res)=>{
    const useremail=req.body.emailId;
    const userId=req.params?.id;
    
    try{
        
        const userEmail=await User.findOne({emailId:useremail});
        if(userEmail.length===0){
            res.status(404).send("User not found");
        }
        else res.send(userEmail);

    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.get("/profile", userAuth,async (req,res)=>{
    try{
        
       const user=req.user;
        
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }

})
app.post("/login",async (req,res)=>{

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
app.get("/feed",async(req,res)=>{
    
    try{
        const user=await User.find({});
        res.send(user);
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})
app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
        
        const user=await User.findByIdAndDelete({_id:userId});

        res.send("User Deleted Sucessfully");
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.patch("/update/:userid",async(req,res)=>{
    const userId=req.body.userId;

    const data=req.body;
    const Allowed_Update=[
        "age","about","gender"
    ]
    try{
        const isallowed=Object.keys(data).every((k)=> Allowed_Update.includes(k));
        if(!isallowed){
            throw new Error ("Update is Not Allowed");
        }
        await User.findByIdAndUpdate({_id:userId},data,{
            runValidators:true,
        });
        res.send("User Updated Sucessfully");
    }
    catch(err){
        res.status(400).send("Update Failed "+err.message);
    }
})
connectDB().then(()=>{
    console.log("Database Established");
    app.listen(7777,()=>{
    console.log("Server is Running on port 7777");
});
}
)
.catch((err)=>{
    console.log("Database cannot be established");
})


