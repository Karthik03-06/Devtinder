const express=require("express")

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello From the Home Page");
});
app.get("/users",(req,res)=>{
    res.send({firstname:"Karthik",lastname:"SK"});
})

app.post("/users",(req,res)=>{
    res.send("Data Sent");
})

app.delete("/users",(req,res)=>{
    res.send("Data deleted");
})
app.listen(7777,()=>{
    console.log("Server is Running on port 7777");
});