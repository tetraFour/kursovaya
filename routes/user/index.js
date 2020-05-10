const User = require("../../models/user");
const router = require("express").Router();

router.put("/changeName/:id", async (req, res) => {
  const id = req.params.id;
  const { newName } = req.body;

  if (!newName) {
    return res.status(400).json({ responseContent: "поля пусты" });
  }
  try {
    const user = await User.where({ id }).fetch();
    await user.save({ name: newName }, { patch: true });

    return res.status(200).json({ responseContent: "имя успешно сменено" });
  } catch (error) {
    return res.status(400).json({ responseContent: "что-то пошло не так" });
  }
});
router.put("/changeLogin/:id", async (req, res) => {
  const id = req.params.id;
  const { newLogin } = req.body;

  if (!newLogin) {
    return res.status(400).json({ responseContent: "поля пусты" });
  }
  try {
    const user = await User.where({ id }).fetch();
    await user.save({ login: newLogin }, { patch: true });

    return res.status(200).json({ responseContent: "логин успешно сменен" });
  } catch (error) {
    return res.status(400).json({ responseContent: "что-то пошло не так" });
  }
});
router.put("/changeEmail/:id", async (req, res) => {
  const id = req.params.id;
  const { newEmail } = req.body;
  if (!newEmail) {
    return res.status(400).json({ responseContent: "поля пусты" });
  }
  try {
    const user = await User.where({ id }).fetch();
    await user.save({ email: newEmail }, { patch: true });

    return res.status(200).json({ responseContent: "email успешно сменен" });
  } catch (error) {
    return res.status(400).json({ responseContent: "что-то пошло не так" });
  }
});

module.exports = router;
