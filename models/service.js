const db = require("../db/connection");

const Service = db.Model.extend({
  tableName: "bank_service",
});

module.exports = Service;
