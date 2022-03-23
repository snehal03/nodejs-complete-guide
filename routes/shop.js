const express = require('express');
const path = require('path');
const productsController = require('../controllers/products');
// const rootDir = require('../util/path');

const router = express.Router();

/*
 express allow us to add new middleware function
 next - allows request to continue to next middleware
*/
router.get('/',productsController.getProducts); 


module.exports = router;
