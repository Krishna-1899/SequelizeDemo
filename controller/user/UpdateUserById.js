const db=require("../../model");
const User=db.userModel;
require("dotenv").config();
const Response=require("../../utils/response");
exports.updateUserById = async (req, res) => {
  const { name, email, roleId } = req.body;
  const id = req.user.id;
  const userDetails={};
  if(name!==''&&name!==null&&name!==undefined) userDetails.name=name
  if(email!==''&&email!==null&&email!==undefined) userDetails.email=email
  if(roleId!==''&&roleId!==null&&roleId!==undefined) userDetails.roleId=roleId
  if(email){
    const result=await User.findOne({where:{email:email}});
    if(result){
      return Response.invalidInput(res,"Email already Used")
    }
    const emailRegx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegx.test(email)){
      return Response.sendFailed(res,"Email Invalid")
    }
  }
  console.log("id from req.user", id);
  try {
    const result=await User.findOne({where:{userId:id}})
    if(!result){
      return Response.sendNotFound(res,"User Not Found")
    }
    await User.update(userDetails,{where:{userId:id}})
    return Response.sendSuccess(res,"User Updated Successfully")
  } catch (error) {
    return Response.sendFailed(res,error.message)
  }
};
