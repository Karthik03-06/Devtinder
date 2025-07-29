const express=require("express")
const connectDB=require("./config/database.js")
const app=express();


const cookieParser=require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/authRoute.js');
const ProfileRouter=require('./routes/ProfileRoute.js');
const RequestRouter=require('./routes/request.js');
const userRouter = require("./routes/userRoute.js");

app.use("/",authRouter);
app.use("/",ProfileRouter);
app.use("/",RequestRouter);
app.use("/",userRouter);


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


