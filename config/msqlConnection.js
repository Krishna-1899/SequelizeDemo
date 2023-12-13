const {Sequelize}=require('sequelize');
const sequelize = new Sequelize('demofromnode','root','password',{
    host: 'localhost',
    logging:false,
    dialect: 'mysql',
});
module.exports=sequelize;