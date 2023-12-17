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
      default: "admin",
      required: true,
    },
    avatar: {
      type: String,
      default: "",
      required: false,
    },
    bio: {
      type: String,
      default: "",
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// CommonJS way
module.exports = UserSchema;
