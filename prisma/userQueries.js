const prisma = require("./query");
const util = require("../lib/passwordUtils");

exports.createNewUser = async (usersFields) => {
  const { username, firstname, lastname, email, password } = usersFields;
  const hashedPassword = await util.encryptPassword(password);

  await prisma.users.create({
    data: {
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstname: true,
      lastname: true,
      password: true,
    },
  });

  return user;
};

exports.getUserById = async (userId) => {
  const query = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  return query;
};

exports.updateUser = async (userId, body) => {
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: { ...body },
  });
};

exports.getMessageListById = async (userId) => {
  const query = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      chats: {
        include: {
          users: {
            select: {
              id: true,
              username: true,
              firstname: true,
              lastname: true,
              email: true,
            },
            where: {
              NOT: {
                id: userId,
              },
            },
          },
          messages: {
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              content: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });

  return [...query.chats];
};
