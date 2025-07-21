const util = require("./passwordUtils");
const db = require("../prisma/queries");

async function verifyLogin(username, password) {
  const user = await db.getUserByUsername(username);
  if (!user) {
    return { success: false, message: "Invalid User" };
  }

  const match = await util.isPasswordCorrect(password, user.password);
  if (!match) {
    return { success: false, message: "Incorrect Password" };
  }

  return { success: true, message: "User Logged In", output: user };
}

module.exports = verifyLogin;
