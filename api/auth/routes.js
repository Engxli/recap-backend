const express = require("express");
const { getAllUsers, register, login, getMyProfile } = require("./controller");
const passport = require("passport");
const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);
module.exports = router;
