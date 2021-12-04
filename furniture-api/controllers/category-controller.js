const Furniture = require('./../models/furniture-model');
const Category = require('./../models/category-model');

module.exports.getCategories = (req, res) => {
    Category.findAll({
            include: [ "furniture" ]
        })
        .then(categories => {
            res.send({
                status: 0,
                data: categories});
        })
        .catch(error => {
            res.send({
                status: -1,
                err: error
            })
        })
}