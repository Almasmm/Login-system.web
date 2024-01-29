const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Asignment1");

connect
  .then(() => {
    console.log("Database connected!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;
