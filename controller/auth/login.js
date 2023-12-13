const db=require("../../model");
const User=db.userModel;
const Response=require("../../utils/response");
const Utils=require("../../utils/utils");
require("dotenv").config();
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if(!email||!password){
        return Response.sendFailed(res,"Enter all details");
    }
    try {
        const result=await User.findOne({where:{email:email}})
        if(!result){
            return Response.sendNotFound(res,"User Not Found")
        }
        if(!await Utils.verifyPassword(password,result.password)){
            return Response.sendFailed(res,"Invalid Email And Password")
        }
        const payload={
            email:result.email,
            id:result.id,
            role:result.RoleId
        }
        const token=Utils.generateToken(payload);
        result.dataValues.token=token;
        result.password=undefined;
        return Response.sendLogin(res,"Login Successfully",result)
    } catch (err) {
        return Response.sendFailed(res,"Login Failure")
    }
};