const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
// const noticesRouter = require("./routes/notices");
// const petsRouter = require("./routes/pets");
// const friendsRouter = require("./routes/friends");
// const newsRouter = require("./routes/news");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
// app.use("/api/notices", noticesRouter);
// app.use("/api/pets", petsRouter);
// app.use("/api/friends", friendsRouter);
// app.use("/api/news", newsRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;