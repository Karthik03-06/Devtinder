const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthenticated= token==="xyz";
    console.log("AdminAuth is Checked");

    if(!isAuthenticated){
        res.status(401).send("UnAuthorized Access");
    }
    else{
        // res.send("Authorized and Data Sent");
        next();
    }
}
module.exports={
    adminAuth,
};