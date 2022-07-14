const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const Movies = require("./model/mflix/movies");

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/APIkey", (req, res) => {
  const theKey = process.env.THE_API_KEY_TEST;
  res.send(`<h1>${theKey}</h1>`);
});

const mongoDB_API = process.env.MONGODB_API_KEY;

const mflixDB = mongoose.createConnection(mongoDB_API).useDb("sample_mflix");

app.get("/movies", async (req, res) => {
  const collection = mflixDB.collection("movies");
  collection
    .find({})
    .limit(2)
    .toArray(function (err, data) {
      res.render("movies", { recievedList: data });
      console.log("\nOur data:");
      console.log(data); // it will print your collection data
      data.forEach((x) => {
        //indiviual data
        console.log(`Id: ${x._id} \t title: ${x.title}`);
      });
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log(`running on ${port}`);
});
