const db=require("../../model");
const User=db.userModel;
const Response=require("../../utils/response");
const Utils=require("../../utils/utils");
exports.signUp=async(req,res)=>{
    const {name,email,password,RoleId}=req.body;
    if(!email||!password){
        return Response.sendFailed(res,"Enter all details")
    }
    const result=await User.findOne({where:{email:email}});
    if(result){
        return Response.sendFailed(res,"Email already resgistered")
    }
    try{
        const hashedPassword=await Utils.hashedPassword(password);
        const result = await User.create({ 
            name:name,
            email:email,
            password:hashedPassword,
            RoleId:RoleId
        });
        return Response.sendCreated(res,"Data entered successfully",result.dataValues)
    }catch(err){
        return Response.sendFailed(res,err.message)
    }
}