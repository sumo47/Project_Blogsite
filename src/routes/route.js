const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const blogController = require("../controller/blogControllers.js")


router.post("/authors",authorController.createAuthor)
router.post("/blogs",blogController.createBlog)
router.get("/blogs",blogController.getBlog)
router.get("/")
module.exports = router;