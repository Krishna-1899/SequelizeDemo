const db=require("../../model");
const User=db.userModel;
const Role=db.roleModel;
const Response=require('../../utils/response')
exports.getUserByID=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return Response.invalidInput(res,"Id invalid")
    }
    const result=await User.findOne({
        where:{id:id},
        include:Role
    });
    if(result){
        return Response.sendCreated(res,"user Find Successfully",result);
    }
    return Response.sendNotFound(res,"User Not Found")
}