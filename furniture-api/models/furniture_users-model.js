const Sequelize = require('sequelize');

const dbConnention = require('../common/db-config');
const Furniture = require('./furniture-model');
const User = require('./user-model');

const Model = Sequelize.Model;

class Furniture_users extends Model{}

Furniture_users.init({
    id : {
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        type:Sequelize.INTEGER
    },
    users_id : {
        type: Sequelize.INTEGER
    },
    furniture_id : {
        type: Sequelize.INTEGER
    }
}, {
    sequelize: dbConnention,
    tableName: 'furniture_userd',
    modelName:'furniture_users',
    timestamps: false
})

Furniture_users.hasOne(Furniture, {
    sourceKey: 'furniture_id',
    foreignKey: 'id'
})

Furniture.hasMany(Furniture_users, {
    as: 'users',
    foreignKey: 'furniture_id'
})

Furniture_users.hasOne(User, {
    sourceKey: 'users_id',
    foreignKey: 'id'
})

User.hasMany(Furniture_users, {
    as: 'wishList',
    foreignKey: 'users_id'
})

module.exports = Furniture_users;