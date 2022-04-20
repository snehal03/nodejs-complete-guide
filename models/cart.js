const getDb = require("../util/database").getDb;
var ObjectId = require("mongodb").ObjectId;

class cart {
  constructor(_id, orderId, userId, productPrice) {
    this._id = _id;
    this.orderId = orderId;
    this.userId = userId;
    this.productPrice = productPrice;
  }

  AddProduct() {
    const db = getDb();
    cart.getCartByUserId(this.userId, (result) => {
       const cart = result;
      if (cart) {
        const cartItems = [...cart.products];
        const index = cartItems.findIndex(
          (product) => product.id.toString() === this.orderId.toString()
        );
        if (index >= 0) {
            cart.products[index].qty = cartItems[index].qty + 1;
        } else {
            cart.products.push({
            id: ObjectId(this.orderId),
            qty: 1,
          });
        }
        cart.totalPrice = Number(cart.totalPrice) + Number(this.productPrice),

        db.collection('cart').updateOne({_id: ObjectId(result._id)} , {$set:  cart })
        .then(result => console.log(result))
        .catch(err => console.log(err))
      } else {
        const cart = {
          products: [
            {id: ObjectId(this.orderId),
            qty: 1}
          ],
          totalPrice: Number(this.productPrice),
          userId: ObjectId(this.userId),
        };
        
        db.collection("cart")
          .insertOne(cart)
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      }
    });
  }

  static getCartByUserId(userId, cb) {
    const db = getDb();
    db.collection("cart")
      .find({ userId: ObjectId(userId) })
      .next()
      .then((result) => {
        cb(result);
      })
      .catch((err) => console.log(err));
  }
  
  static deleteProduct(_id, productPrice , userId) {
    cart.getCartByUserId(userId, (result) => {
 
      const updatedCart = result;
      const product = updatedCart.products.find((prod) => prod.id.toString() === _id.toString());
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id.toString() !== _id.toString()
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
        db.collection('cart').updateOne({_id: ObjectId(result._id)} , {$set:  cart })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    });
  }

  static getCart(cb) {
    const db =  getDb();
    return db.collection('cart').find().toArray().then(users =>{
        return cb(users);
    })
    .catch(err => console.log(err))
  }


}

module.exports = cart;
