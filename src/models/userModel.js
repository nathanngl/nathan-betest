const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  identityNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
