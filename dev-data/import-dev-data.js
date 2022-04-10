const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

dotenv.config({ path: "../config.env" });
const Item = require("../model/itemModel");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected with local database successfully");
  });

//reading JSON file
const vegItems = JSON.parse(
  fs.readFileSync(`${__dirname}/items-data/vegetablesData.json`, "utf-8")
);

const groceryItems = JSON.parse(
  fs.readFileSync(`${__dirname}/items-data/groceryData.json`, "utf-8")
);

// console.log(typeof items);

const insertVegData = async () => {
  try {
    await Item.create(vegItems);
    console.log("Data inserted");
  } catch (err) {
    console.log("Error", err);
  }
};
const insertGroceryData = async () => {
  try {
    await Item.create(groceryItems);
    console.log("Data inserted");
  } catch (err) {
    console.log("Error", err);
  }
};

const removeAllData = async () => {
  try {
    await Item.deleteMany();
    console.log("All data deleted");
  } catch (err) {
    console.log("Error", err);
  }
};

// console.log(process.argv);//Read the command line flags
// console.log(process.argv[2]);//Read the command line flags

if (process.argv[2] === "--insertveg") {
  insertVegData();
} else if (process.argv[2] === "--delete") {
  removeAllData();
  1;
} else if (process.argv[2] === "--insertgroc") {
  insertGroceryData();
}
