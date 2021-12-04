const express = require('express');
const router = express.Router();
const Furniture_usersController = require('../controllers/furniture_users-controller');
const expressJwt = require('express-jwt');

let auth = expressJwt({
    secret: 'testserverkey', 
    userProperty: 'body.userData', 
    algorithms: ['HS256']
});

router.post('/wishList/delete', auth, Furniture_usersController.deleteFurniture_users);
router.post('/wishList', auth, Furniture_usersController.addFurniture_users);

module.exports = router;