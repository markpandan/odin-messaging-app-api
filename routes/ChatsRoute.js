const express = require("express");
const router = express.Router();

const controller = require("../controllers/ChatsController");

router.get("/:chatId", controller.getChatContent);

router.post("/:chatId", controller.postChatMessage);

module.exports = router;
