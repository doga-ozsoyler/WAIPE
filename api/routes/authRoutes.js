const express = require("express");
const passport = require("passport");
const {
  preSignupController,
  signupController,
  signinController,
  signinWithGoogleController,
} = require("../controllers/authControllers");
require("../config/passport")(passport);

const authRoutes = express.Router();

authRoutes.post("/presignup", preSignupController);
authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);
authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  signinWithGoogleController
);

module.exports = authRoutes;
