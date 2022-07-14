const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

const mongoDB_API = process.env.MONGODB_API_KEY;

const mflixDB = mongoose.createConnection(mongoDB_API).useDb("sample_mflix");
const movieSchema = new Schema({ url: String, text: String, id: Number}, 
    { collection : 'movies' }); 


const Movies = mflixDB.model("Movie", movieSchema);
module.exports = Movies;
