var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blogController.js");

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlogByID);
router.post("/create", blogController.createBlog);
router.delete("/delete/:id", blogController.deleteBlog);
router.put("/update/:id", blogController.updateBlog);

module.exports = router;
