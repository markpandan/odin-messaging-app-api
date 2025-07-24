const { uploadToCloud } = require("../config/cloudinary");
const { singleFileUpload } = require("../config/mutler");
const { isAuth } = require("../lib/authUtils");
const db = require("../prisma/chatQueries");

exports.getChatContent = [
  isAuth,
  async (req, res) => {
    const { chatId } = req.params;
    const { id: userId } = req.user;
    try {
      const content = await db.getChatById(chatId);

      for (const user of content.users) {
        if (user.id == userId) {
          res.json({ output: content });
          return;
        }
      }

      res
        .status(401)
        .json({ message: "Unauthorized Access. User ID doesn't match" });
    } catch (error) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  },
];

exports.postChatMessage = [
  isAuth,
  singleFileUpload("image"),
  async (req, res) => {
    const { chatId } = req.params;
    const { message, senderId } = req.body;

    try {
      await db.postChatNewMessage(chatId, senderId, message, req.file);
      await uploadToCloud(req.file.path, req.file.destination);

      res.json({ message: "Message Submitted" });
    } catch (error) {
      console.error(error);

      res.status(500).json({ message: error.message });
    }
  },
];

exports.postChatNew = [
  isAuth,
  async (req, res) => {
    const { id: userId } = req.user;
    const { ids } = req.body;

    await db.postNewChat([userId, ...ids]);

    res.json({ message: "Chat created" });
  },
];
