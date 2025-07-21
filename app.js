const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRoute = require("./routes/UsersRoute");
app.use("/users", usersRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  console.log(`Link is http://localhost:${PORT}/`);
});
