const { Schema, model } = require("mongoose");

const TweetSchema = new Schema({
  text: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Tweet", TweetSchema);
