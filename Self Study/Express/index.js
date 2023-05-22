const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

// to parse the body data coming from a form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(adminRouter);
app.use(shopRouter);

app.listen(8000);
