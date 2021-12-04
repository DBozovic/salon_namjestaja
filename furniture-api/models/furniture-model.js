 
 const Sequelize = require('sequelize');


 const dbConnention = require('./../common/db-config');

 const Category = require('./../models/category-model');

 const Model = Sequelize.Model;

 class Furniture extends Model { }

 Furniture.init({ 
     id : {
         primaryKey: true,
         allowNull: false,
         autoIncrement:true,
         type:Sequelize.INTEGER
     },
     categoryID: {
         type:Sequelize.INTEGER,
        field:'category_id'
     },
     name :{
         type:Sequelize.STRING
     },
     description : {
         type:Sequelize.STRING
     },

     price : {
         type:Sequelize.INTEGER
     },
     image_path :{
         type:Sequelize.STRING,
         field:'image_path'
     }
  } ,{ 
      sequelize: dbConnention,
      tableName: 'furniture',
      modelName:'furniture',
      timestamps: false
   })

     //specifikacija veza 
     Furniture.hasOne(Category, {
         sourceKey:'categoryID',
         foreignKey:'id'
     })
    
     Category.hasMany(Furniture, {
        as: 'furniture',
        foreignKey: 'categoryID'
    })
     


     module.exports = Furniture;