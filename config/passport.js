const passport = require("passport");
const passportJWT = require("passport-jwt");

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const User = require("../models/user");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(options, async (payload, next) => {
  const user = await User.forge({ id: payload.id }).fetch();
  return next(null, user);

  // .then((res) => {
  //   next(null, res);
  // });
});

passport.use(strategy);

module.exports = passport;
