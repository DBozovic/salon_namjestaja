const Sequelize = require('sequelize');

const dbConnention = require('./../common/db-config');

const Model = Sequelize.Model;

class Category extends Model{}

Category.init({ 
    id : {
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    name: {
        type:Sequelize.STRING
    }
},{
    sequelize: dbConnention,
    tableName: 'category',
    modelName:'category',
    timestamps: false
})

module.exports =Category;