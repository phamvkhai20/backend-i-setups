const express = require("express");
const router = express.Router();
const UserController = require("../../app/controllers/UserController");
const { verifyAuthorization, verifyTokenAndAdmin } = require("../verifyToken");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", verifyAuthorization, UserController.update);
router.delete("/delete/:id", verifyAuthorization, UserController.deleteUser);
router.get("/find-user/:id", verifyTokenAndAdmin, UserController.getUser);
router.get("/get-all", verifyTokenAndAdmin, UserController.getUserAll);

module.exports = router;
