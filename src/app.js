const express=require("express")

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello From the Home Page");
});

app.use("/about",(req,res)=>{
    res.send("Hello From the About Page");
});

app.use("/home",(req,res)=>{
    res.send("This is The about page");
});

app.listen(7777,()=>{
    console.log("Server is Running on port 7777");
});