var Promise = require("bluebird");

var knex = require('knex')({
  client: "pg",
  connection: {
    host: "localhost",
    database: "mydb"
  }
});

//var bookshelf = require("bookshelf")(knex);

//module.exports = bookshelf;

knex.schema.createTableIfNotExists("users", function (table) {
  table.increments();
  table.string("name");
  table.timestamps();
  table.string("email");
});

