const express=require("express");
const router=express.Router();
const {signUp}=require("../controller/auth/signUp");
const { login } = require("../controller/auth/login");
router.post("/signUp",signUp);
router.post("/login",login);
module.exports=router