var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  }
});

schema.virtual("bestTime").get(function () {
  return mongoose.model("Time").findOne({level: this._id})
         .sort({time: -1})
         .limit(1)
         .populate("player");
});

schema.virtual("allTimes").get(function () {
  return mongoose.model("Time").find({level: this._id})
         .populate("player");
});


module.exports = mongoose.model("Level", schema);
