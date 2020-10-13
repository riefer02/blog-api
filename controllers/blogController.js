const blogModel = require("./models/Blog.js");

exports.getBlogs = async (req, res) => {
  const blogs = await blogModel.find({}, "title", (err, blogPosts) => {
    if (err) return handleError(err);
    console.log(blogPosts);
  });
  res.json({
    blogs,
  });
};

exports.createBlog = async (req, res) => {
  var blogPost = new blogModel({
    title: req.body.title,
    topic: req.body.topic,
    summary: req.body.summary,
  });

  await blogPost.save(function (err, post) {
    if (err) return handleError(err);
    console.log(post);
    res.json({
      post,
    });
  });
};
