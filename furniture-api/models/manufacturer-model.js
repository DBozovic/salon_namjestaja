const Sequelize = require('sequelize');

const dbConnention = require('./../common/db-config');

const Model = Sequelize.Model;

class Manufacturer extends Model{}

Manufacturer.init({ 
    id : {
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    name: {
        type:Sequelize.STRING
    },
    country:{
        type:Sequelize.STRING
    }

},{
    sequelize: dbConnention,
    tableName: 'manufacturer',
    modelName:'manufacturer',
    timestamps: false
})

module.exports =Manufacturer;