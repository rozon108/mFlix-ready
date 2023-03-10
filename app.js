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

    .toArray(function (err, fullData) {
      const topRatedMovies = [];
      fullData.forEach((x) => {
        const ourRating = x.imdb.rating;
        const requiredRating = 8;
        if (ourRating > requiredRating) {
          topRatedMovies.push(x);
        }
        //console.log(ourRating);
      });
      //console.log(topRatedMovies);
      const topRatedMoviess = topRatedMovies.slice(0, 100);
      console.log(topRatedMovies[1]);
      //Sort Movies by highest rating
      topRatedMovies.sort((a, b) => {
        return b.imdb.rating -a.imdb.rating;
        //return a.imdb.rating < b.imdb.rating? 1 : (a.imdb.rating == b.imdb.rating? 0 : -1);
      });
      console.log(topRatedMovies.slice(0,2));
      console.log("Unsorted \n");
      console.log(topRatedMoviess.slice(0,2));

      const data = fullData.slice(0, 100);
      res.render("movies", { recievedList: data, topRateList: topRatedMovies });
      console.log("\nOur data length:");
      console.log(data.length); // it will print your collection data
      data.forEach((x) => {
        //indiviual data
        //console.log(`Id: ${x._id} \t title: ${x.title}`);
        var ourID = x._id;
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
