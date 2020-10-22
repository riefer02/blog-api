const blogModel = require("../models/Blog.js");

// Retrieve all blogs from db
exports.getBlogs = async (req, res) => {
  let blogs = await blogModel.find({}, (err, blogPosts) => {
    if (err) return handleError(err);
    console.log(blogPosts);
  });
  res.json({
    blogs,
  });
};

// Retrieve specific blog from db
exports.getBlogByID = async (req, res) => {
  let blog = await blogModel.find({ _id: req.params.id }, (err, blogPost) => {
    if (err) return console.log(err);
  });
  res.json({
    blog,
  });
};

// POST new blog to db
exports.createBlog = async (req, res) => {
  console.log("Creating blog...");
  var blogPost = new blogModel({
    title: req.body.title,
    topic: req.body.topic,
    summary: req.body.summary,
  });

  await blogPost.save(function(err, post) {
    if (err) return err;
    console.log(post);
    res.json({
      post,
    });
  });
};
