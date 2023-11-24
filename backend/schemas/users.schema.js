import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    avatar: String,
    bio: [
      {
        body: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

export default UserSchema;
