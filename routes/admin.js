const express = require("express");
const path = require("path");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
// const rootDir = require('../util/path');

const router = express.Router();

router.get("/add-product", isAuth, adminController.getAddProducts);

router.post("/add-product", isAuth, adminController.postAddProducts);

router.get("/products", adminController.getProducts);

router.get("/edit-product/:productId",isAuth, adminController.getEditProduct);

router.post("/edit-product",isAuth, adminController.postEditProducts);

router.post("/delete-product",isAuth, adminController.postDeleteProducts);

module.exports = router;
