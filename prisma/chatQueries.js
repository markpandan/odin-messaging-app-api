const prisma = require("./query");
const path = require("node:path");

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

exports.postChatNewMessage = async (chatId, senderId, message, file) => {
  if (file) {
    const basename = path.parse(file.filename).name;

    await prisma.messages.create({
      data: {
        content: message,
        chatId,
        senderId,
        file: {
          create: {
            id: basename,
            name: file.originalname,
            size: file.size,
          },
        },
      },
    });
  } else {
    await prisma.messages.create({
      data: {
        content: message,
        chatId,
        senderId,
      },
    });
  }
};

exports.postNewChat = async (ids) => {
  ids = ids.map((id) => {
    return { id };
  });

  await prisma.chats.create({
    data: {
      users: { connect: ids },
    },
  });
};
