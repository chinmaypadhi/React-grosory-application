const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT Exception shutting down the Application!");
  console.log(err);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected with database successfully");
  });

const app = require("./app");
//creating server
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED Rejection Shutting down the Application!");
  console.log(err.name, err.message);
  console.log(err);
  //Gently shutting down the server, then the node process
  server.close(() => {
    process.exit(1);
  });
});
