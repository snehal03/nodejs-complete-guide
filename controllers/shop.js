const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      isAuthenticated: req.session.isLoggedIn
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
      isAuthenticated: req.session.isLoggedIn,
      csrfToken: req.csrfToken()
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProduct = cart.products.find(
          (prod) => prod._id === product._id
        );
        if (cartProduct) {
          cartProducts.push({ productData: product, qty: cartProduct.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
        isAuthenticated : req.session.isLoggedIn
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.AddProduct(productId, product.price);
  });
  return res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
      isAuthenticated: req.session.isLoggedIn
    });
  });
};

exports.postCartDeleteProducts = (req, res) => {
  const productId = req.body.productId;
  Cart.deleteProduct(productId);
  return res.redirect("cart");
};


exports.postOrder = (req, res, next) => {
  Cart.saveOrder();
  return res.redirect('/orders');
};


exports.getOrders = (req, res, next) => {

  Cart.getOrders((cart) => {
    Product.fetchAll((products) => {
      const prods = [];
     
      for (product of products) {
        const cartProduct = cart.products.find(
          (prod) => prod._id === product._id
        );
        if (cartProduct) {
          prods.push({ product: product, qty: cartProduct.qty });
        }
      }
      order = {
        _id: cart._id,
        products : prods
      };

      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        isAuthenticated: req.session.isLoggedIn,
        order: order
      });
    });
  });

};

exports.getInvoice = (req, res, next) => {
  Cart.getOrders((cart) => {
    Product.fetchAll((products) => {
      const prods = [];
      let totalSum = 0;
     
      for (product of products) {
        const cartProduct = cart.products.find(
          (prod) => prod._id === product._id
        );
        if (cartProduct) {
          totalSum = totalSum + (Number(cartProduct.qty) * Number(product.price));
          prods.push({ product: product, qty: cartProduct.qty });
        }
      }
      res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
        products: prods,
        totalSum: totalSum,
        isAuthenticated : req.session.isLoggedIn
      });
    });
  });
};