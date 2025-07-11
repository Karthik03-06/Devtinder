const express=require("express")
const connectDB=require("./config/database.js")
const app=express();
const User=require("./models/user.js");
const {validatesignup}=require('./utils/validator.js')
const {adminAuth}=require('./middlewares/auth.js');

app.use(express.json());
app.post("/signup",async(req,res)=>{
    try{
        validatesignup(req);
        const {firstName,lastName,emailId,password}=req.body;

        const passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            emailId,
            passwordHash
        });
        await user.save();
        res.send("User added Sucessfully");
    }
    catch(err){
        res.status(400).send("Error in saving data"+err.message);
    }
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


