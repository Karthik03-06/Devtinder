const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
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