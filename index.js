const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("./src/config/db");
const { mainRouter } = require("./src/api/routes/main-router");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", mainRouter);

app.use("*", (req, res, next) => {
  res.send("Route Not Found");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  connectToDB();
  console.log(`App is listening to port ${PORT} 😉`);
});
