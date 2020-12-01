//Sets process.env to the variables in .env
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const { init } = require("./strategy");
const session = require("express-session");

const app = express();
init(passport);

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

app.get("/login", passport.authenticate("strava"));
app.get(
  "/strava/callback",
  passport.authenticate("strava", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("Successfull login");
    res.redirect("/");
  },
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/protected", checkAuth, (req, res) => {
  res.send("Hello there");
});

app.listen(Number(process.env.PORT || 8080));
