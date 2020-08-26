const express = require("express");
const admin = require("firebase-admin");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Enum = require("../constants/enum");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: Enum.sessionSecret,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(morgan("combined"));

app.use("/comp", require("../routes/componentes"));
app.use("/orca", require("../routes/orcamentos"));
app.use("/plan", require("../routes/plantas"));
app.use("/user", require("../routes/usuarios"));

module.exports = app;
