const Blog = require("../models/Blog.js");

exports.likeBlogPost = async (req, res) => {
  console.log(req.body);
  const blogPost = await Blog.findById(req.body.blogID)
    .then((blog) => {
      return blog;
    })
    .catch((err) => {
      console.log(err);
    });
  if (!blogPost.likes.includes(req.body.userID)) {
    blogPost.likes.unshift(req.body.userID);
    await blogPost.save().then((blog) => {
      res.json({
        message: "You liked this blog post!",
        uniqueLike: true,
        blog,
      });
    });
  } else {
    res.json({
      message: "You already liked this post!",
      uniqueLike: false,
    });
  }
};
