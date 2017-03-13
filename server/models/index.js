var mongoose = require("mongoose");
var mongodb = process.env.NODE_ENV === "production" ? process.env.MONGOLAB_URI : "mongodb://localhost/unityportal";
console.log("MONGODB IS: ", mongodb);
mongoose.connect(mongodb);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

require("./level");
require("./time");
require("./respawnpoint");
require("./user");