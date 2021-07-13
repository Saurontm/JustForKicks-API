const LocalStategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
const { User } = require("../db/models");

exports.localStrategy = new LocalStategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (passwordMatch) return done(null, user);
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.JWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) return done(null, false);
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
