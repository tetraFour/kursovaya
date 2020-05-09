const db = require("../db/connection");

const Card = db.Model.extend({
  tableName: "card",
  users() {
    return this.hasOne("User");
  },
});

module.exports = Card;
