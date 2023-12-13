const express=require("express");
const router=express.Router();
const {auth,isStudent,isAdmin, }=require("../middleware/Auth");
const {addProfileImage}=require("../controller/user/AddUserProfile");
const {changeUserPassword}=require("../controller/user/ChangeUserpassword");
const {deleteUserById}=require("../controller/user/DeleteUserById");
const {getAllUsers}=require("../controller/user/GetAllUsers");
const {getUserByID}=require("../controller/user/GetUserById");
const {updateUserById}=require("../controller/user/UpdateUserById");
router.get("/test",auth);//done
router.get("/isStudent",isStudent);//done
router.get("/isAdmin",isAdmin);//done
router.get("/getAllUsers",getAllUsers);//done
router.get("/getUserById",getUserByID); //done
router.post("/addProfileImage",auth,addProfileImage);//done
router.put("/updateUserById",auth,updateUserById);//done
router.put("/changeUserPassword",auth,changeUserPassword);//done
router.delete("/deleteUserById",auth,isAdmin,deleteUserById);
module.exports=router;