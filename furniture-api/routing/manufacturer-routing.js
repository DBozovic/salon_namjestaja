//ne koristi se, nije radjeno nista sa proizvodjacima....

const express = require('express');
const manufacturerController = require('./../controllers/manufacturer-controller');

const router = express.Router();

// Postoji 5 osnovnih operacija (poziva) za svaki entitet sa kojim radite
// 1. get - dovlaci sve iz baze
router.get('/manufacturer', manufacturerController.getManufcturers);

module.exports = router;