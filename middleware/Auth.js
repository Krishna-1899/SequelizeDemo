//auth,isstudent,isadmin
const Response=require("../utils/response");
const Utils=require("../utils/utils");
exports.auth=(req,res,next)=>{
    try{
        //extract jwt token
        const token = req.header("Authorization").replace("Bearer ","")    
        console.log("token",token);
        if(!token){
            Response.sendNotFound(res,"Token missing");
        };
        //verify token
        const decode=Utils.verifyJwtToken(token)
        req.user=decode;
        next();
    }
    catch(error){
        Response.sendFailed(res,err.message)
    }
}
exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role !== 2 ){
            Response.sendFailed(res,"this is protected route for student")
        }
        next();
    }catch(err){
        Response.sendFailed(res,err.message)
    };
}
exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role !== 1 ){
            Response.sendFailed(res,"this is protected route for Admin")
        }
        next();
    }catch(err){
        Response.sendFailed(res,err.message)
    };
}
