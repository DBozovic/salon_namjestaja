const Sequelize = require('sequelize');

const dbConnention = require('../common/db-config');
const Furniture = require('./furniture-model');

const Model = Sequelize.Model;

class User extends Model{}

User.init({ 
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
        unique: true,
        type:Sequelize.STRING

    },
    password:{
        type:Sequelize.INTEGER

    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }

},{
    sequelize: dbConnention,
    tableName: 'users',
    modelName:'user',
    timestamps: false
})

module.exports = User;