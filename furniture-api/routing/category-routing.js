const express = require('express');
const categoryController = require('./../controllers/category-controller');
const expressJwt = require('express-jwt');
const router = express.Router();

let auth = expressJwt({
    secret: 'testserverkey', 
    userProperty: 'body.userData', 
    algorithms: ['HS256']
});

// Postoji 5 osnovnih operacija (poziva) za svaki entitet sa kojim radimo

router.get('/category', auth, categoryController.getCategories);

module.exports = router;