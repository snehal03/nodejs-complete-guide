const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop');
// const rootDir = require('../util/path');

const router = express.Router();

/*
 express allow us to add new middleware function
 next - allows request to continue to next middleware
*/
router.get('/',shopController.getIndex); 

router.get('/products',shopController.getProducts); 

router.get('/cart',shopController.getCart); 

router.get('/checkout', shopController.getCheckout); 

router.get('/orders', shopController.getOrders); 

module.exports = router;
