const mongoose = require('mongoose');
const Book = require('../models/book');
const {bookSeed} = require('./fakedata')

mongoose.connect('mongodb://localhost:27017/bookDB');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    await Book.deleteMany({});
    await insertDB();
    
}

const insertDB = async() => {
   for(const b of bookSeed){
        const book = new Book(b);
        await book.save();
    }
}

seedDB();