const express = require("express");
const path = require("path");
const shopController = require("../controllers/shop");
// const rootDir = require('../util/path');

const router = express.Router();

/*
 express allow us to add new middleware function
 next - allows request to continue to next middleware
*/
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.getOrders);

router.post("/cart-delete-item", shopController.postCartDeleteProducts);

module.exports = router;
