var mongoose = require("mongoose");

// Models and Schema
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: String,
  summary: String,
  topic: String,
  author: String,
});
var blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;
