const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(_id, title, imageUrl, description, price) {
    this._id = _id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this._id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod._id === this._id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this._id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deletById(_id) {
    getProductsFromFile((products) => {
      const product = products.filter((p) => p._id === _id);
      const updatedProducts = products.filter((p) => p._id !== _id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(_id, product.price);
        }
      });
    });
  }

  static findById(_id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p._id === _id);
      cb(product);
    });
  }
};
