var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  level: {
    type: String,
    default: "1",
    required: true
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

schema.statics.createTime = function(reqbody){
		return this.create({
			"level": reqbody.level,
			"player":reqbody.player,
			"time": reqbody.time
    });
};

schema.statics.getTopTimes = function (level, player) {
  var query = {};
  player && (query.player = player);
  level && (query.level = level);
  return this.find(query)
  .sort({time: 1})
  .populate("player")
  .then(times => times.map(time => {
      time.time = time.time.toFixed(3);
      time.player = time.player.sanitize();
      return time;
  }));
};

module.exports = mongoose.model("Time", schema);
