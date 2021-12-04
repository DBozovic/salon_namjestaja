const express = require('express');

const router = express.Router();

const userController = require('../controllers/user-controller');
const expressJwt = require('express-jwt');

let auth = expressJwt({
    secret: 'testserverkey', 
    userProperty: 'body.userData',
   
    algorithms: ['HS256']
});

router.get('/register', userController.getRegister ); //ne koristi se..., nidje se ne vracaju svi korisnici

router.post('/register', userController.insertRegister); //signup novog korisnika

router.post('/login', userController.postLogin);

router.get('/login/:id', auth, userController.getUserById)

router.put('/user', auth, userController.updateUser);   //ruta za update usera(za edit profila)

module.exports = router;