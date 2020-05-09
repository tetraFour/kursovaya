const Service = require("../../models/service");
const router = require("express").Router();

router.get("/getBankServices", async (req, res) => {
  try {
    const services = await Service.forge().fetchAll();
    // console.log(services);

    return res.status(200).json(services);
  } catch (error) {
    return res.status(400).json("oops...");
  }
});

module.exports = router;
