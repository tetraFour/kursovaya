require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// const knex = require("knex");

const port = process.env.PORT || 5000;

const passport = require("./config/passport");

const routes = require("./routes");

app.use(passport.initialize());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(passport.initialize());
app.use(cors());

app.use(routes);

app.get("/", (req, res) => {
  return res.status(200).send("well done");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
