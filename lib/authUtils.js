const passport = require("passport");

const isAuth = passport.authenticate("jwt", { session: false });

const verifyAccount = (accountType, payload, userParams) => {
  if (payload.accountType !== accountType)
    return { success: false, message: "Not A Valid Account Type" };

  if (payload.username !== userParams)
    return { sucess: false, message: "Usernames Don't Match" };

  return { success: true, message: "Account Verified" };
};

module.exports = { isAuth, verifyAccount };
