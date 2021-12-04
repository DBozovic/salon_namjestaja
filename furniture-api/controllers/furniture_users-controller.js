const Furniture_users = require('../models/furniture_users-model');

module.exports.deleteFurniture_users = (req, res) =>{
    Furniture_users.destroy({where: {furniture_id : req.body.furniture_id, users_id : req.body.users_id}}).then(data =>{
        res.send({
            status: 0
        })
    }).catch(err =>{
        res.send({
            status: -1,
            error: err
        })
    })
}

module.exports.addFurniture_users = (req, res) =>{
    Furniture_users.create(req.body).then(data =>{
        res.send({
            status: 0,
            data: data
        })
    }).catch(err =>{
        res.send({
            status: -1,
            error: err
        })
    })

}
