const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
        values:["Accepted","Rejected","Interested","Ignore"],
        message:'{VALUE} is not a valid status',
        },
    },
},{
    timestamps:true,
}
);

const ConnectionRequestModel=mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel;