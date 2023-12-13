const fs=require("fs");
const path=require("path")
const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require("../config/msqlConnection")
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
const modelsDir=__dirname;
const currentFile = path.basename(__filename);
console.log("directory",modelsDir);
console.log("current file",currentFile);
fs.readdirSync(modelsDir)
  .filter(file=>file !==currentFile)
  .forEach(file => {
    console.log(file);
    const fileName = path.parse(file).name;
    console.log("filename",fileName)
    db[fileName]=require(`${modelsDir}/${file}`)(sequelize, DataTypes);
  });
// console.log(db)
db.roleModel.hasMany(db.userModel)
db.userModel.belongsTo(db.roleModel)
db.sequelize.sync({ alter : true });
module.exports=db;