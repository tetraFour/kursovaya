const knex = require("knex");
const knexDb = knex({
  client: "pg",
  // connection: {
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   port: process.env.DB_PORT,
  // },
  connection: process.env.DATABASE_URL,
});
const bookshelf = require("bookshelf");
const securePassword = require("bookshelf-secure-password");
const db = bookshelf(knexDb);
db.plugin(securePassword);

module.exports = db;
