const express = require('express');
const app=express();
require("dotenv").config();
require("./model");
app.use(express.json());
const fileUpload= require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}));
const PORT = process.env.PORT||3000;
app.use(express.json());
const user = require("./Routes");
app.use("/api/v1",user);
app.listen(PORT,()=>{
    console.log(`App is listing at ${PORT}`)
});
