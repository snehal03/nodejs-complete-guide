const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

const order= path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "orders.json"
);


module.exports = class Cart {
  static AddProduct(_id, productPrice) {
    // fetch the previous cart
    fs.readFile(p, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      // Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod._id === _id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { _id: _id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(_id, productPrice) {
    fs.readFile(p, (err, fileData) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileData) };
      const product = updatedCart.products.find((prod) => prod._id === _id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod._id !== _id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }

  /**
   * Order 
   */
  static saveOrder() {
    fs.readFile(p, (err, fileData) => {
      if(!err){
        const data =  {...JSON.parse(fileData), _id: Math.random() };
        fs.writeFile(order, JSON.stringify(data), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getOrders(cb) {
    fs.readFile(order, (err, data) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(data));
    });
  }
};
