const mongoose = require("mongoose");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      min: [2, "Your name needs to be at least two characters long"],
      required: [true, "The firstname can not be empty"],
    },
    lastName: {
      type: String,
      trim: true,
      min: [2, "Your name needs to be at least two characters long"],
      required: [true, "The lastname can not be empty"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bicycles: [],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

const UserModel = {
  create: function (newUser) {
    return User.create(newUser);
  },
  find: function () {
    return User.find();
  },
  findOne: function (conditions) {
    return User.findOne(conditions);
  },
  update: function (conditions, fieldToUpdate) {
    return User.findByIdAndUpdate(conditions, {
      $push: { bicycles: fieldToUpdate },
    });
  },
};

module.exports = UserModel;
