const Comment = require("../models/Comment.js");
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

  await newComment.save(newComment).then((commentData) => {
    return Blog.findById(req.params.id).then((blog) => {
      blog.comments.unshift(commentData);

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
