const express = require("express");
const router = express.Router();

const controller = require("../controllers/UsersController");

router.post("/login", controller.userLogin);

router.post("/signup", controller.userSignup);

router.get("/outside", controller.getOutsideUsers);

router.get("/:userId", controller.getUser);

router.put("/:userId", controller.putUser);

router.get("/:userId/messages", controller.messageList);

module.exports = router;
