const Card = require("../../models/card");
const router = require("express").Router();

router.get("/getCards/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const allCard = await Card.where({ user_owner_id: id }).fetchAll({
      require: false,
    });
    return res.status(200).send(allCard);
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.post("/createCard", async (req, res) => {
  const { cardNumber, cardOwner, cvv, initialCash, userOwnerId } = req.body;

  if (!cardNumber || !cardOwner || !cvv || !initialCash) {
    return res.status(404).json({ responseContent: "поля пусты" });
  }

  if (!userOwnerId) {
    return res
      .status(404)
      .json({ responseContent: "пользователь не существует" });
  }
  const card = new Card({
    card_number: cardNumber,
    card_cvv: cvv,
    card_owner: cardOwner,
    card_cash: initialCash,
    user_owner_id: userOwnerId,
  });

  try {
    await card.save();
    return res.status(200).json({ responseContent: "карта создана" });
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.delete("/deleteCard/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Card.where({ id }).destroy();
    return res.status(200).json({ responseContent: "карта удалена" });
  } catch (error) {
    return res.status(400).json({ responseContent: "произошла ошибка" });
  }
});
router.put("/chargeMoney/:id", async (req, res) => {
  const { chargeMoney } = req.body;
  const id = req.params.id;

  if (!chargeMoney) {
    return res.status(400).json({ responseContent: "некоректные данные" });
  }

  try {
    const moneyFromCurrentCard = await Card.where({ id }).fetch();
    const finalSum = +moneyFromCurrentCard.attributes.card_cash + chargeMoney;

    await moneyFromCurrentCard.save({ card_cash: finalSum }, { patch: true });

    return res.status(200).send(moneyFromCurrentCard);
  } catch (error) {
    return res.status(404).send(error);
  }
});
router.put("/withdrawMoney/:id", async (req, res) => {
  const { withdrawMoney } = req.body;
  const id = req.params.id;
  if (!withdrawMoney) {
    return res.status(400).json({ responseContent: "некоректные данные" });
  }
  try {
    const moneyFromCurrentCard = await Card.where({ id }).fetch();
    if (+moneyFromCurrentCard.attributes.card_cash < withdrawMoney) {
      return res.status(400).json({ responseContent: "недостаточно средств" });
    }
    const finalSum = +moneyFromCurrentCard.attributes.card_cash - withdrawMoney;

    await moneyFromCurrentCard.save({ card_cash: finalSum }, { patch: true });

    return res.status(200).json({ responseContent: "средства списаны" });
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.put("/transferMoney/:id", async (req, res) => {
  const { transferMoney, cardNumber } = req.body;
  const id = req.params.id;
  // console.log(transferMoney, cardNumber, id);
  if (!transferMoney || !cardNumber) {
    return res.status(400).json({ responseContent: "некоректные данные" });
  }
  try {
    const firstCard = await Card.where({ id }).fetch();
    if (+firstCard.attributes.card_cash < transferMoney) {
      return res.status(400).json({ responseContent: "недостаточно средств" });
    }
    const debitedMoney = +firstCard.attributes.card_cash - transferMoney;

    await firstCard.save({ card_cash: debitedMoney }, { patch: true });

    const lastCard = await Card.where({ id: cardNumber }).fetch();

    const finalSum = +lastCard.attributes.card_cash + transferMoney;

    await lastCard.save({ card_cash: finalSum }, { patch: true });

    return res
      .status(200)
      .json({ responseContent: "средства были перенесены на другую карту" });
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
