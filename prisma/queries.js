const { PrismaClient } = require("@prisma/client");
const util = require("../lib/passwordUtils");

const prisma = new PrismaClient();

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
  });

  return user;
};

exports.getUserById = async (userId) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};
