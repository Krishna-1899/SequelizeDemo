const db=require("../../model");
const Role=db.roleModel;
const User=db.userModel;
const Response=require("../../utils/response");
exports.getAllUsers=async(req,res)=>{
    try{
        // const result=await Role.findAll({include:User});
        const result=await User.findAll({include:Role});
        console.log(result);
        return Response.sendCreated(res,"Users",result)
    }catch(error){
        return Response.sendNotFound(res,"No Record Found")
    }
}