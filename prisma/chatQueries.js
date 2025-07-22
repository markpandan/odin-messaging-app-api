const prisma = require("./query");

exports.getChatById = async (chatId) => {
  const query = await prisma.chats.findUnique({
    where: {
      id: chatId,
    },
    include: {
      users: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return query;
};

exports.postChatNewMessage = async (chatId, senderId, message) => {
  await prisma.messages.create({
    data: {
      content: message,
      chatId,
      senderId,
    },
  });
};
