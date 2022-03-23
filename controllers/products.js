const Product = require('../models/product');

exports.getAddProducts = (req,res)=>{
    // res.sendFile(path.join(rootDir, 'views','add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProducts = (req,res)=>{
    const product = new Product(req.body.title);
    product.save();
    // products.push({title: req.body.title})
    res.redirect('/');
}

exports.getProducts = (req,res,next)=>{
    const products = Product.fetchAll();
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
    // __direname point to current fiolder path from root
   // rootDir points to root folder of project
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    /* console.log("in another middleware!");
    res.send('<h1>Hello From Express!</h1>'); // allow use to send resp of any type ex html, json ,text */
}