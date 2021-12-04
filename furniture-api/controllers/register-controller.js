const Register = require('./../models/register-model');


module.exports.getRegister = (req,res)=>{         //postoji parametar getFurniture koji je funkcija
  Register.findAll(
     
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
  Register.create(req.body)
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
