const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = Mongoose.model("Users", user);
