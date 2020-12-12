var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blogController.js");
const commentController = require("../controllers/commentController");
const likeController = require("../controllers/likeController.js");

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogByID);
router.post("/create", blogController.createBlog);
router.delete("/delete/:id", blogController.deleteBlog);
router.put("/update/:id", blogController.updateBlog);

//Comment Routes
router.get("/:id/comments", commentController.getComments);
router.post("/:id/comments/create", commentController.createComment);

//Like Routes
router.post("/:id/like", likeController.likeBlogPost);

module.exports = router;
