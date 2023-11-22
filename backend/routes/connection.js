const mongoose = require("mongoose");

// const mongoURI = process.env.MONGO_URI;
const mongoURI = "mongodb://localhost:27017/antcode";
console.log(mongoURI);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
