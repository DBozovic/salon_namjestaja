 const express = require('express');

 const router = express.Router();

const furnitureContoller = require('./../controllers/furniture-controller');
const expressJwt = require('express-jwt');

let auth = expressJwt({
    secret: 'testserverkey', 
    userProperty: 'body.userData', 
    algorithms: ['HS256']
});

 router.get('/furniture', furnitureContoller.getFurniture );

 
 router.get('/furniture/:id', furnitureContoller.getFurnitureByID);

 router.post('/furniture', auth, furnitureContoller.insertFurniture);

 router.put('/furniture', auth,  furnitureContoller.updateFurniture);
 
router.delete('/furniture/:id', auth, furnitureContoller.deleteFurniture);

 module.exports = router;