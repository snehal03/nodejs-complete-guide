const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "users.json"
);

const getUsersFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(data));
  });
};

module.exports = class User {
  constructor(_id, email, password) {
    this._id = _id;
    this.email = email;
    this.password = password;
  }
  save() {
    getUsersFromFile((users) => {
        const existingUserIndex = users.findIndex(
          (user) => user.email === this.email
        );
      if (existingUserIndex) {
        const updatedUsers = [...users];
        updatedUsers[existingUserIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedUsers), (err) => {
          console.log(err);
        });
      } else {
        this._id = Math.random().toString();
        users.push(this);
        fs.writeFile(p, JSON.stringify(users), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static deletById(_id) {
    getUsersFromFile((users) => {
    //   const user = users.filter((p) => p._id === _id);
      const updatedUsers = users.filter((p) => p._id !== _id);
      fs.writeFile(p, JSON.stringify(updatedUsers), (err) => {
     /*    if (!err) {
          Cart.deleteUser(_id, product.price);
        } */
      });
    });
  }

  static findByEmail(email, cb) {
    getUsersFromFile((users) => {
      const user = users.find((p) => p.email === email);
      cb(user);
    });
  }

}