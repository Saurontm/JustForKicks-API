const LocalStategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

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