const express = require("express");
const path = require("path");
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");
// const rootDir = require('../util/path');

const router = express.Router();

/*
 express allow us to add new middleware function
 next - allows request to continue to next middleware
*/
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth,shopController.getCart);

router.post("/cart", isAuth,shopController.postCart);

router.post("/cart-delete-item",isAuth, shopController.postCartDeleteProducts);

router.get("/checkout", isAuth,shopController.getCheckout);

router.get("/orders",isAuth, shopController.getOrders);

router.post("/create-order",isAuth, shopController.postOrder);

router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;
