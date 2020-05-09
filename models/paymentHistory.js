const db = require("../db/connection");

const PaymentHistory = db.Model.extend({
  tableName: "payment_history",
});

module.exports = PaymentHistory;
