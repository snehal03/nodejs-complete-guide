const getDb = require("../util/database").getDb;
var ObjectId = require('mongodb').ObjectId; 

class product {
    constructor(_id, title, imageUrl, description, price ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = _id;
    }

    save() {
       const db = getDb();
       if(this._id) {
        db.collection('products').updateOne({_id: ObjectId(this._id)} , {$set:  this })
        .then(result => console.log(result))
        .catch(err => console.log(err))
       }else {
        db.collection('products').insertOne(this)
        .then(result => console.log(result))
        .catch(err => console.log(err))
       }

    }


  static fetchAll(cb) {
    const db =  getDb();
    return db.collection('products').find().toArray().then(products =>{
        return cb(products);
    })
    .catch(err => console.log(err))
  }

  static deletById(_id) {
    const db =  getDb();
    db.collection('products').deleteOne({_id: ObjectId(_id)}).then(result => {
        // delete cart product
    })
    .catch(err => console.log(err))
  }

  static findById(id, cb) {
    const db =  getDb();
    db.collection('products').find({_id: ObjectId(id)}).next().then(result => {
      // console.log(id,"***********product by id",result)
        cb(result);
    })
    .catch(err => console.log(err))
  }
}

module.exports = product;