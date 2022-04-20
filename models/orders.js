const getDb = require("../util/database").getDb;
var ObjectId = require("mongodb").ObjectId;

class order {
  constructor(_id, products , userId, totalPrice) {
    this._id = _id;
    this.products = products;
    this.userId = userId;
    this.totalPrice = totalPrice;
  }


  /**
   * Order 
   */
   static saveOrder() {
    const db = getDb();
     db.collection('orders').insertOne(this)
     .then(result => console.log(result))
     .catch(err => console.log(err))
  }

  static getOrders(cb) {
    const db =  getDb();
    return db.collection('orders').find().toArray().then(orders =>{
        return cb(orders);
    })
    .catch(err => console.log(err))
  }
}

module.exports = order;
