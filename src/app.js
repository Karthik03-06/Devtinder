const express=require("express")
const connectDB=require("./config/database.js")
const app=express();
const User=require("./models/user.js");

const {adminAuth}=require('./middlewares/auth.js');

app.use(express.json());
app.post("/signup",async(req,res)=>{
    console.log(req.body);
    const user=new User(req.body);
    try{

        await user.save();
        res.send("User added Sucessfully");
    }
    catch(err){
        res.status(400).send("Error in saving data"+err.message);
    }
})
app.get("/user", async (req,res)=>{
    const useremail=req.body.emailId;

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

app.patch("/update",async(req,res)=>{
    const userId=req.body.userId;

    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("User Updated Sucessfully");
    }
    catch(err){
        res.status(400).send("Something went wrong");
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


