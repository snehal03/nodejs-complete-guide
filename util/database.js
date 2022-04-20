const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongoclient
    .connect(
      "mongodb+srv://snehal03:snehal_098@product.tfrl3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then((client) => {
    _db = client.db('myFirstDatabase');
      callback();
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
};

const getDb = () =>{
    if(_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;