var mongoose = require("mongoose");
var _ = require('lodash');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var schema = new Schema({
	X: Number,
	Y: Number,
	Z: Number,
	Angle: Number
})

module.exports = mongoose.model("Respawnpoint", schema);