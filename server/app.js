var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

// models
var mongoose = require("mongoose");
require("./models");

var port = process.env.PORT || 1337;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => (console.log("running"), next()));
require("./authentication")(app);
// api routes
app.use("/api", require("./routes"));



app.use((err, req, res, next) => console.error(err, err.stack));

app.listen(port, () => console.log("listening on port:", port));

app.use(express.static(path.join(__dirname, "/deploy")));
app.use("/deploy", (req, res, next) => res.sendFile(path.join(__dirname, "/deploy/index.html")));
