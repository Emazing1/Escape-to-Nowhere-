var mongoose = require("mongoose");
var Time = mongoose.model("Time");

module.exports = require("express").Router()

.get("/", (req, res, next) => {
  Time.find({})
  .populate("player")
  .sort({time: 1})
  .then(levels => levels.map(level => ((level.player = level.player.sanitize()), level)))
  .then(levels => res.json(levels))
  .catch(next);
})

.get("/:level", ({params}, res, next) => {
  var seen = {};
  Time.getTopTimes(params.level)
  .then(times => times.filter(({player}) => seen.hasOwnProperty(player) ? false : (seen[player] = true)))
  .then(times => res.json(times.slice(0, 100)))
  .catch(next);
})

.post("/", (req, res, next) => {
	Time.createTime(req.body)
	.then(time => res.json(time))
  .catch(next);
});
