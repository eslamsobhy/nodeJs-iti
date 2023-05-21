const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// to parse the body data coming from a form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/add-product", (req, res, next) => {
  res.send(`
    <form action="/products" method="POST">
      <input type="text" name="title" />
      <button type="submit">Add Product</button>
    </form>
  `);
});

app.use("/products", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express.js</h1>"); // send response
});

app.listen(8000);
