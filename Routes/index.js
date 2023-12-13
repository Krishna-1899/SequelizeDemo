const express=require("express");
const app=express();
const userRoutes=require("./user");
const authRoutes=require("./auth");
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
module.exports=app;