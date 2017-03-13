var mongoose = require("mongoose");
var Level = mongoose.model("Level");

module.exports = require("express").Router()

.get("/", (req, res, next) => {
	Level.find()
	.then(levels => res.json(levels))
	.catch(next);
})

.post("/", ({body}, res, next) => {
	Level.create(body)
	.then(level => res.json(level))
	.catch(next);
})

.put("/", (req, res, next) => {

})

.delete("/:id", (req, res, next) => {

});


