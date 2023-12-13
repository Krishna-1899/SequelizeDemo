const db = require("../../model");
const User = db.userModel;
const fs = require("fs-extra");
const Response = require("../../utils/response");
const { DATE } = require("sequelize");
exports.addProfileImage = async (req, res) => {
  const id = req.user.id;
  const file = req.files.file;
  if (!file) {
    return Response.invalidInput(res, "Enter File Properly");
  }
  const fileType = file.name.split(".")[1].toLowerCase();
  const supportedTypes = ["jpg", "jpeg", "png"];
  if (!supportedTypes.includes(fileType)) {
    return Response.invalidInput(res, "File Not Supported");
  }
  let path =
    __dirname +
    "/../../upload/files/" +
    Date.now() +
    `.${file.name.split(".")[1]}`;
  try {
    const result = await User.findOne({ where: { id: id } });
    console.log(result);
    const oldPath = result.profilePath;
    if (oldPath) {
      if (await fs.exists(oldPath)) fs.remove(oldPath);
    }
    console.log("PATH->", path);
    file
      .mv(path)
      .then(async() => {
        await User.update({ profilePath: path}, { where: { id: id } });
        return Response.sendSuccess(res, "Profile picture added successfully");
      })
      .catch((error) => {
        fs.remove(path);
        return Response.sendFailed(res, error.message);
      });
  } catch (error) {
    return Response.sendFailed(res, error.message);
  }
};
