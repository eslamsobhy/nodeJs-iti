const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// to parse the body data coming from a form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/shop", shopRouter);

// handling the not found routes
app.use((req, res, next) => {
  res
    .status(404)
    .send(`<h1 style="text-align: center; color: red">Page not found!</h1>`);
});

app.listen(8000);
