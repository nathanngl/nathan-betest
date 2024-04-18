const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  accountNumber: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  emailAddress: {
    index: true,
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  identityNumber: {
    index: true,
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
