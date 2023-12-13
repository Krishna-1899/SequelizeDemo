const db = require("../../model");
const User = db.userModel;
const Response = require("../../utils/response");
const Utils = require("../../utils/utils");
exports.changeUserPassword = async (req, res) => {
  const { password, newPassword, newConfirmPassword } = req.body;
  if (newPassword !== newConfirmPassword) {
    return Response.invalidInput(
      res,
      "Password and confirm password is not match"
    );
  }
  const id = req.user.id;
  console.log(id);
  try {
    const result = await User.findOne({ where: { userId: id } });
    if (!result) {
      return Response.sendNotFound(res, "User Not Found");
    }
    const actualPassword = result.password;
    console.log(actualPassword);
    if (!(await Utils.verifyPassword(password, actualPassword))) {
      return Response.invalidInput(res, "Password is incorrect");
    }
    const hashedPassword = await Utils.hashedPassword(password);
    await User.update({ password: hashedPassword }, { where: { userId: id } });
    return Response.sendSuccess(res, "User updated successfully");
  } catch (err) {
    return Response.sendFailed(res, err.message);
  }
};
