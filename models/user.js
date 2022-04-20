const { getDb } = require("../util/database");

class User {
//   resetToken;
//   resetTokenExpiration;
  constructor( email, password) {
    this.email = email;
    this.password = password;
  }

  save() {
     User.findByEmail(this.email,(result)=>{
        const userFound = result;
        if(!userFound) {
            const db =  getDb();
            db.collection('users').insertOne(this)
           .then(result => console.log(result))
           .catch(err => console.log(err))
        }else{
            throw 'User already exists'
        }
     });

  }

  static fetchAll(cb) {
    const db =  getDb();
    return db.collection('users').find().toArray().then(users =>{
        return users;
    })
    .catch(err => console.log(err))
  }

  static deletById(_id) {
    const db =  getDb();
    db.collection('users').deleteOne({_id: ObjectId(_id)}).then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
  }

  static findByEmail(email, cb) {
    const db =  getDb();
    db.collection('users').findOne({email: email}).then(result => {
        cb(result);
    })
    .catch(err => console.log(err))
  }

}

module.exports = User;