const router = require("express").Router();

const auth = require("./auth");
const card = require("./card");
const service = require("./service");
const paymentHistory = require("./payment_history");

router.use("/auth", auth);
router.use("/cards", card);
router.use("/services", service);
router.use("/payment_history", paymentHistory);

module.exports = router;
