const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next(); // allows the request to continue to the next middleware
});

app.use((req, res, next) => {
  console.log("Hello from another middleware!!");
  res.send("<h1>Hello from Express.js</h1>"); // send response
});

app.listen(8000);
