// const {role}=require("./index");
module.exports=(sequelize,DataTypes)=>{
    // console.log(role);
    const User=sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your name'
                }
            }   
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notNull: {
                    msg: 'Please enter your password'
                }
            }
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull: false
        // },
        // updatedAt: {
        //     type: DataTypes.DATE,
        //     defaultValue:sequelize.literal('CURRENT_TIMESTAMP'),
        //     allowNull: false
        // },
        // roleId:{
        //     type:DataTypes.INTEGER,
        //     references:{
        //         model:"roles",
        //         key: 'roleId'
        //     },
        //     defaultValue:1,
        //     allowNull:false,
        //     validate: {
        //         notNull: {
        //             msg: 'Please enter your role'
        //         }
        //     }
        // },
        profilePath:{
            type:DataTypes.STRING,
        }
    },
    {
        tableName:"users"
    });
    return User;
}