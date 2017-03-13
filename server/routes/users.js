var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = require("express").Router()

.get("/", (req, res, next) => {
  User.find()
  .then(players => players.map(player => player.sanitize()))
  .then(players => res.json(players))
  .catch(next);
})

.post("/", ({body}, res, next) => {
  User.create(body)
  .then(player => res.json(player))
  .catch(next);
})

.param("id", (req, res, next, id) => {
  User.findById(id)
  .then(user => req.user = user)
  .then(() => next(), next);
})

.get("/:id/:level",({user, params}, res, next) => {
  user.getTopTimes(params.level)
  .then(times => res.json(times))
  .catch(next);
})

.get("/:id", ({user}, res, next) => res.json(user.sanitize()))

.post("/:id", ({user, body}, res, next) => {
  user.updateInfos(body)
  .then(updatedPlayer => res.json(updatedPlayer.sanitize()))
  .catch(next);
});
