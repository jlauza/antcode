// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    password: {
      type: String,
      required: true,
      min: 9,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    avatar: {
      type: String,
      default: "",
      required: false,
    },
    bio: [
      {
        body: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

// CommonJS way
module.exports = UserSchema;

// ES6 way
// export default UserSchema;
