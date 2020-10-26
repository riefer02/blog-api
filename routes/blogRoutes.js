var express = require("express");
var router = express.Router();

const blogModel = require("../models/Blog.js");
const blogController = require("../controllers/blogController.js");

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogByID);
router.post("/create", blogController.createBlog);
router.delete("/delete", blogController.deleteBlog);

module.exports = router;
