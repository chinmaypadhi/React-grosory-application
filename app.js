const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const globalErrorHandler = require("./controller/errorController");
const itemRouter = require("./route/itemRouter");
const userRouter = require("./route/userRouter");
const orderRouter = require("./route/orderRouter");

const app = express();

console.log(`You are in ${process.env.NODE_ENV} mode`);
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP,Please try in an hour ",
});

//API ROUTES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", limiter);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/api/v1/item", itemRouter);
app.use("/api/v1/order", orderRouter);

app.use("/api/v1/user", userRouter);

//Limits the request from same IP,Please try again in an hour

//middleware

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

const publicPath = path.join(__dirname, "/client/", "build");

app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// app.all("*", (req, res, next) => {
//   // const err = new Error(`can't find ${req.originalUrl} on this server!`);
//   // err.status = "fail";
//   // err.statusCode = 404;

// next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
