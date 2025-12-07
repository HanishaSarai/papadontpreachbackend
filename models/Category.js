// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
//   name: String,
  imageUrl: String,
});

module.exports = mongoose.model("Category", categorySchema);
