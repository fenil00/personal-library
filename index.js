const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

mongoose.connect('mongodb://localhost:27017/bookDB');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

// POST Routes
app.post('/books/newbook', (req, res)=> {
    const {title, author, year,comment, isbn} = req.body;
    const comments = new Array(comment);
    const book = new Book({ title: title, author : author, year: year, ISBN:isbn,comments : comments });
    book.save();
    res.redirect('/books');
});

app.post('/books/:id/newcomment', async (req, res)=> {
    const { id } =  req.params;
    const { comment } = req.body;
    const b  = await Book.findById(id).then(data => {
        return data;
    });
    b.comments.push(comment);
    b.save();
    res.redirect(`/books/${id}`);
});

app.delete('/books/:id', async (req, res)=> {
    const { id } =  req.params;
    const b  = await Book.findByIdAndDelete(id).then(data => {
        return data;
    });
    //console.log(b);
    
    res.redirect(`/books`);
});

// GET Routes
app.get('/books/newbook', (req,res) => {
    res.render('newbook');
});

app.get('/books/:id', async (req, res)=> {
    const { id } = req.params;
    const book = await Book.findById(id).then(data => {
        return data;
    });
    res.render('show', {book});
});

app.get('/books', async (req, res)=> {
    const books = await Book.find({}).then( data => {
        return data;
    });
    res.render('books', {books});
});

app.get('/', (req, res)=> {
    res.render('home');
});

app.listen(8000, () => {
    console.log("On port 8000 personal library");
});