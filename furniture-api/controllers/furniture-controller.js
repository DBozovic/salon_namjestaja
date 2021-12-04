  const Furniture = require('./../models/furniture-model');
  const Category= require('./../models/category-model');
const Furniture_users = require('../models/furniture_users-model');

 module.exports.getFurniture = (req,res)=>{         //postoji parametar getFurniture koji je funkcija
    Furniture.findAll({
        include: [ Category, "users"]
    }
        
    )
    .then(furniture=>{
        res.send(furniture)
    })
    .catch(error=> {
        res.send({
            status:-1,
            err:error
        })
    })

}


 module.exports.getFurnitureByID = (req,res)=>{
   Furniture.findByPk(req.params.id)
   .then(furniture=>{
       res.send(furniture);
   })
  .catch(error=>{
    res.send({
        status:-1,
        err:error
    })

  })
 }

module.exports.insertFurniture = (req,res)=> {
    Furniture.create(req.body)
    .then(data=>{
        res.send( {
        status:0,
        data:data
        })
    })
    .catch(error=>{
        res.send({
            status:-1,
            error:err
        })
    })
} 

 module.exports.updateFurniture = (req,res)=>{
     Furniture.update(req.body,{where : {id: req.body.id}})
     .then(data=>{
        res.send( {
        status:0,
       
        })
    })
    .catch(error=>{
        res.send({
            status:-1,
            error:err
        })
    })
 }
 
 module.exports.deleteFurniture = (req,res)=>{
   Furniture.destroy({where: {id: req.params.id}})
   .then(data=>{
    res.send( {
    status:0,
   
    }) 
})
   .catch(error=>{
       res.send({
        status:-1,
        error:err
       })
   })
}
