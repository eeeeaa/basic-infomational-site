const express = require("express");
const path = require("path");
const logger = require("morgan");

const port = 8080;
const app = express();

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/routes/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/routes/about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname + "/routes/contact-me.html"));
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname + "/routes/404.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
