const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// make this directory accessable by the whole application
app.use(express.static(path.join(__dirname, "public")));

// to parse the body data coming from a form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", adminRouter.router);
app.use(shopRouter);

// handling the not found routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(8000);
