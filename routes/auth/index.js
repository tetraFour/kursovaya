const User = require("../../models/user");
const router = require("express").Router();
const passport = require("../../config/passport");
const jwt = require("jsonwebtoken");
// const db = require("../../db/queries");

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    return res.send(req.user);
  }
);

router.post("/createUser", async (req, res) => {
  const { email, login, password, name } = req.body;

  if (!email || !password || !login || !name) {
    return res.status(401).json({ responseContent: "поля пусты" });
  }

  const user = new User({
    email,
    login,
    password,
    name,
  });

  try {
    const existingUser = await user.fetch({ require: false });

    if (existingUser || existingUser !== null) {
      throw Error;
    }
  } catch (error) {
    return res.status(401).json({
      responseContent: "пользователь уже существует",
      error,
    });
  }

  try {
    await user.save();
    return res.status(200).json({ responseContent: "пользователь был создан" });
  } catch (error) {
    return res
      .status(400)
      .json({ responseContent: "не удалось создать пользователя" });
  }
});

router.post("/getToken", async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(401).json({ responseContent: "пустые поля" });
  }

  let existingUser;

  try {
    existingUser = await User.forge({ login }).fetch({ require: false });
  } catch (error) {
    return res
      .status(400)
      .json({ responseContent: "пользователь не существует" });
  }

  try {
    const userAuth = await existingUser.authenticate(password);
    const payload = { id: userAuth.id };
    console.log(payload);
    const token = {
      token: jwt.sign(payload, process.env.SECRET_OR_KEY),
      id: payload.id,
    };
    return res.send(token);
  } catch (error) {
    return res.status(401).json({ responseContent: "что-то пошло не так" });
  }
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("i'm protected");
  }
);

module.exports = router;
