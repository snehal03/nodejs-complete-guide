const express = require('express');
const path = require('path');
const adminController = require('../controllers/admin');
// const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', adminController.getAddProducts);

router.post('/add-product', adminController.postAddProducts);

router.get('/products',adminController.getProducts);

module.exports = router;
