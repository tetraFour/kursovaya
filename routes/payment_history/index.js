const PaymentHistory = require("../../models/paymentHistory");
const router = require("express").Router();

router.get("/getHistory/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const history = await PaymentHistory.where({ by_whom: id }).fetchAll();
    // console.log(services);
    return res.status(200).send(history);
  } catch (error) {
    return res.status(400).json({ responseContent: "что-то пошло не так" });
  }
});
router.post("/createPaymentHistory/:id", async (req, res) => {
  const id = req.params.id;
  const { info, cost } = req.body;

  try {
    const history = await PaymentHistory.forge({ info, by_whom: id, cost });
    await history.save();
    return res.status(200).json({ responseContent: "история записана" });
  } catch (error) {
    return res.status(400).json({ responseContent: "что-то пошло не так" });
  }
});

module.exports = router;
