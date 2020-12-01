const StravaStrategy = require("passport-strava-oauth2").Strategy;

module.exports = {
  init(passport) {
    passport.use(
      new StravaStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
          process.nextTick(function () {
            return done(null, { ...profile, accessToken });
          });
        },
      ),
    );
    passport.serializeUser(function (user, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
      cb(null, obj);
    });
  },
};
