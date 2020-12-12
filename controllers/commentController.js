const Comment = require("../models/comment");
const Blog = require("../models/Blog.js");

exports.getComments = (req, res) => {
  res.json({
    message: "Here are your comments!",
  });
};

exports.createComment = async (req, res) => {
  const newComment = new Comment({
    content: req.body.content,
    author: req.body.author,
    authorID: req.params.id,
  });

  console.log(newComment);
  await newComment.save(newComment).then((commentData) => {
    console.log("Trying to Save to Blog Comment Array..");
    return Blog.findById(req.params.id).then((blog) => {
      console.log(blog);
      blog.comments.unshift(commentData);
      console.log("blog after adding comment", newComment);
      return blog
        .save()
        .then((commentData) => {
          res.json({
            message: "You created a new comment!",
            commentData,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};
