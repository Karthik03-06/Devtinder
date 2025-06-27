const mongoose=require("mongoose");

const connectDB =async ()=>{
    await mongoose.connect("mongodb+srv://Karthik:Karthik2006@cluster2.rajk21x.mongodb.net/devtinder ");
}


module.exports= connectDB;