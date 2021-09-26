const express = require("express");
const router = express.Router();
const { verifyToken } = require("../verifyToken");
const PostController = require("../../app/controllers/PostController");
router.post("/create", verifyToken, PostController.create);
router.get("/user-by-post/:id", PostController.userByPost);
// router.get("/:id", verifyToken, PostController.getPost);

module.exports = router;
