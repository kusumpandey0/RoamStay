const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileimagePath: {
      type: String,
      default: "",
    },
    role:{
      type:String,
      enum:["user","admin"],
      default:"user",
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
