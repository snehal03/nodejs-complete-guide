const Product = require('../models/product');

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
          });
    });
    // __direname point to current fiolder path from root
   // rootDir points to root folder of project
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    /* console.log("in another middleware!");
    res.send('<h1>Hello From Express!</h1>'); // allow use to send resp of any type ex html, json ,text */
}


exports.getIndex = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
          });
    });
}


exports.getCart = (req,res,next)=>{
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
}

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}


exports.getOrders = (req,res,next)=>{
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });
}

