
const fs=require('fs-extra');
const db=require("../../model");
const User=db.userModel;
const Response=require("../../utils/response");
exports.deleteUserById=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return Response.invalidInput(res,"Enter Valid id");
    }
    console.log(id);
    try{
        const result=await User.findOne({where:{userId:id}})
        console.log(result);
        if(!result){
            return Response.sendNotFound(res,"User Not found");
        }
        const path=result.profilePath;
        await User.destroy({where:{userId:id}}).then(async()=>{
            if(path){
                fs.exists(path)
                .then(() => fs.remove(path))
                .catch((err) => {
                    console.error(`Error while checking or removing file: ${err.message}`);
                    throw err;
                });
            }
            return Response.sendSuccess(res,"User Deleted Successfully");
        })
    }catch(err){
        console.log("errror from catch block",err.message);
        return Response.sendFailed(res,err.message);
    }
}