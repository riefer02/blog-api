exports.likeBlogPost = (req, res) => {
  console.log("You liked this blog post!");
  res.json({
    message: "You liked this blog post!",
  });
};
