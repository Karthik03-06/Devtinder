const express=require("express")
const connectDB=require("./config/database.js")
const app=express();
const User=require("./models/user.js");

const {adminAuth}=require('./middlewares/auth.js');


app.post("/signup",async(req,res)=>{
    const user=new User({
        firstName:"Virat",
        lastName:"Kholi",
        emailId:"Virat@gmail.com",
        password:"Virat@123",
    });
    try{

        await user.save();
        res.send("User added Sucessfully");
    }
    catch(err){
        res.status(400).send("Error in saving data");
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


