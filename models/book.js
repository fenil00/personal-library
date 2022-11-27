const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose
const BookSchema = new Schema({
    title : String,
    author: String,
    year : Number,
    price: Number,
    ISBN : String,
    description : String,
    image: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema); //this will create collection name "books" from "Book" in database. 