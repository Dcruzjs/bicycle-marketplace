const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
// const bodyParser = require("body-parser");
const Router = require("./server/routes/Router");
const UserRouter = require("./server/routes/UserRouter");

require("./server/config/database");
require("dotenv").config();

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 20 },
  })
);
// adding morgan to log HTTP requests
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/", Router);
app.use("/users", UserRouter);

app.listen(process.env.PORT, function () {
  console.log(`The users server is running in port ${process.env.PORT}.`);
});
