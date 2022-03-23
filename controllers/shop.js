const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
  // __direname point to current fiolder path from root
  // rootDir points to root folder of project
  // res.sendFile(path.join(rootDir,'views','shop.html'));
  /* console.log("in another middleware!");
    res.send('<h1>Hello From Express!</h1>'); // allow use to send resp of any type ex html, json ,text */
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProduct = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProduct) {
          cartProducts.push({ productData: product, qty: cartProduct.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.AddProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.postCartDeleteProducts = (req, res) => {
  const productId = req.body.productId;
  Cart.deleteProduct(productId);
  res.redirect("cart");
};
