const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: String,
  password: String,
  tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
});

module.exports = model("User", UserSchema);
