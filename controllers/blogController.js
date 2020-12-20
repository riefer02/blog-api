const Blog = require("../models/Blog.js");

// Retrieve all blogs from db
exports.getBlogs = async (req, res) => {
  let blogs = await Blog.find({}, (err) => {
    if (err) return console.log(err);
  });
  res.json({
    blogs,
  });
};

// Retrieve specific blog from db
exports.getBlogByID = async (req, res) => {
  let blog = await Blog.find({ _id: req.params.id }, (err) => {
    if (err) return console.log(err);
  });
  res.json({
    blog,
  });
};

// POST new blog to db
exports.createBlog = async (req, res) => {
  console.log("Creating blog...");
  var blogPost = new Blog({
    title: req.body.title,
    topic: req.body.topic,
    summary: req.body.summary,
    author: req.body.author,
  });

  await blogPost.save(function (err, post) {
    if (err) return err;
    console.log(post);
    res.json({
      post,
    });
  });
};

exports.deleteBlog = async (req, res) => {
  console.log("Deleting blog...");
  await Blog.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return console.log(err);
  });
  res.json({
    message: "blog deleted successfully",
  });
};

exports.updateBlog = async (req, res) => {
  console.log("Updating blog...");
  console.log(req.body);
  const updatedBlog = req.body;
  await Blog.findOneAndUpdate({ _id: req.params.id }, updatedBlog, (err) => {
    if (err) return console.log(err);
  });
  res.json({
    message: "blog updated successfully",
  });
};
