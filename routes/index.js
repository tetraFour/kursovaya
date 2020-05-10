const router = require("express").Router();

const auth = require("./auth");
const card = require("./card");
const user = require("./user");
const service = require("./service");
const paymentHistory = require("./payment_history");

router.use("/auth", auth);
router.use("/cards", card);
router.use("/services", service);
router.use("/payment_history", paymentHistory);
router.use("/users", user);

module.exports = router;
