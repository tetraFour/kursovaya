require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    // connection: {
    //   database: process.env.DB_NAME,
    //   user: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   port: process.env.DB_PORT,
    // },
    connection: process.env.DATABASE_URL,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
