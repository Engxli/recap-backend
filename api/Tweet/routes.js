const express = require("express");
const {
  getAllTweets,
  createTweet,
  deleteTweet,
  getTweetsByUserId,
  updateThisCuteTweet,
} = require("./controllers");
const passport = require("passport");

const router = express.Router();

router.get("/tweets", getAllTweets);
router.post(
  "/tweets/",
  passport.authenticate("jwt", { session: false }),
  createTweet
);

router.delete(
  "/tweets/:tweetId",
  passport.authenticate("jwt", { session: false }),
  deleteTweet
);

router.get("/tweets/:userId", getTweetsByUserId);
router.put("/tweets/:tweetId", updateThisCuteTweet);
module.exports = router;
