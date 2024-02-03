// imports
const express = require("express");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./api/auth/routes");
const tweetRouter = require("./api/Tweet/routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const path = require("path");
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

// my routes
console.log(__dirname);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/auth", authRouter);
app.use("/api", tweetRouter);
// not found handler
app.use((req, res, next) => {
  return res.status(404).json({ message: "Path not found!" });
});

// error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Server error!");
});

// connect to DB
connectDB();
// run server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
