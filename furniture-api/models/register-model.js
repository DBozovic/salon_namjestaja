const Sequelize = require('sequelize');

const dbConnention = require('./../common/db-config');

const Model = Sequelize.Model;

class Register extends Model{}

Register.init({ 
    id : {
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    first_name: {
        type:Sequelize.STRING
    },
    last_name:{
        type:Sequelize.STRING
    },
    email : {
        type:Sequelize.STRING

    },
    password:{
        type:Sequelize.INTEGER

    }

},{
    sequelize: dbConnention,
    tableName: 'users',
    modelName:'register',
    timestamps: false
})

module.exports =Register;