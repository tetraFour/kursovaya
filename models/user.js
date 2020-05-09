const db = require("../db/connection");

const User = db.Model.extend({
  tableName: "users",
  hasSecurePassword: true,
  cards() {
    return this.hasMany("Card");
  },
});

module.exports = User;
