const { ObjectId } = require("mongodb");
const Product = require("../models/product");

exports.getAddProducts = (req, res) => {
  // res.sendFile(path.join(rootDir, 'views','add-product.html'));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProducts = (req, res) => {
    console.log("************product",req.body)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  console.log("************product",product)
  product.save();
  // products.push({title: req.body.title})
  return res.redirect("products");
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(productId, (product) => {
    console.log(productId,"********product",product)
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn
    });
  });
};

exports.postEditProducts = (req, res) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(
   new ObjectId(productId),
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  return res.redirect("products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      isAuthenticated: req.session.isLoggedIn
    });
  });
};

exports.postDeleteProducts = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Product.deletById(productId, product.price);
    return res.redirect("products");
  });
};
