const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

const getAllTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find().populate({
      path: "user",
      select: "username",
    });

    return res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

const createTweet = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const tweet = await Tweet.create(req.body);
    return res.status(201).json(tweet);
  } catch (error) {
    next(error);
  }
};

const deleteTweet = async (req, res, next) => {
  try {
    // req.user._id
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ message: "tweet not found!" });
    if (tweet.user.equals(req.user._id)) {
      await tweet.deleteOne();
      return res.status(204).end();
    } else {
      return res.status(401).json({ message: "You are not the tweet owner!" });
    }
  } catch (error) {
    next(error);
  }
};

const getTweetsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tweets = await Tweet.find({ user: userId }).populate(
      "user",
      "username"
    );
    return res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

const updateThisCuteTweet = async (req, res, next) => {
  try {
    await Tweet.findByIdAndUpdate(req.params.tweetId, req.body);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllTweets,
  createTweet,
  deleteTweet,
  getTweetsByUserId,
  updateThisCuteTweet,
};
