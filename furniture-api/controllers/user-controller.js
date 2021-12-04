const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const Furniture = require('../models/furniture-model');
const Furniture_users = require('../models/furniture_users-model');


//ne koristi se...
module.exports.getRegister = (req,res)=>{         
  User.findAll(
     
  )
  .then(register=>{
      res.send(register)
  })
  .catch(error=> {
      res.send({
          status:-1,
          err:error
      })
  })

}

module.exports.insertRegister = (req,res)=> {
  User.create(req.body)
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


//login korisnika
module.exports.postLogin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(data => {
        if(data.password == req.body.password){
            token = jwt.sign({
                id: data.id,
                email: req.body.email, 
                isAdmin: data.isAdmin
            }, 'testserverkey', {expiresIn: '2h'});
            res.send({
                status: 0, 
                token: token //ako sve prodje kako treba salje se token i status nula
            })
        } else {
            res.send({ status: -1 });
        }
    }).catch(error => {
        res.send({status: -1});
    })
}

module.exports.getUserById = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: ["wishList"]
    }).then(data => {
        if(!data){
            res.send({ status: -1 });
        } else {
            res.send({
                status: 0,
                User: data
            })
        }
    }, error => {
        res.send({status: -1});
    }).catch(error => {
        res.send({status: -1});
    })
}

module.exports.updateUser = (req,res)=>{
    User.update(req.body,{where : {id: req.body.id}})
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
