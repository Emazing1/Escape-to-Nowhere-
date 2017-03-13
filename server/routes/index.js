module.exports = require("express").Router()
.use("/levels", require("./levels"))
.use("/times", require("./times"))
.use("/users", require("./users"))

.use((req, res) => res.sendStatus(404));