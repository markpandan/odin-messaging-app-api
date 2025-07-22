const issueToken = require("../lib/jwtUtils");
const db = require("../prisma/userQueries");
const verifyLogin = require("../lib/verifyLogin");
const { isAuth } = require("../lib/authUtils");

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;
  const verify = await verifyLogin(username, password);

  if (verify.success) {
    const token = issueToken(verify.output);
    res.json({ output: { token } });
  } else {
    res.status(401).json({ message: verify.message });
  }
};

exports.userSignup = async (req, res) => {
  const { username, password, firstname, lastname, email } = req.body;

  try {
    await db.createNewUser({ username, password, firstname, lastname, email });
    res.json({ message: "User account created" });
  } catch (error) {
    console.error(error);

    // TODO: It's better to utilize express validator next time.
    if (
      error.name == "PrismaClientKnownRequestError" &&
      error.code == "P2002"
    ) {
      res.status(401).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.getUser = (req, res) => {};

exports.putUser = (req, res) => {};

exports.messageList = [
  isAuth,
  async (req, res) => {
    const { userId } = req.params;

    const chats = await db.getMessageListById(userId);

    res.json({ output: chats });
  },
];
