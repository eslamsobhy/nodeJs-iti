const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("This will always run for each request!");
  next();
});

app.use("/add", (req, res, next) => {
  console.log("will just run for '/add' request!");
  res.send("<h1>The adding page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("Hello from middleware!!");
  res.send("<h1>Hello from Express.js</h1>"); // send response
});

app.listen(8000);
