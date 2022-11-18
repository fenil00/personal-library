const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Book = require('./models/book');
const morgan = require('morgan');

const app = express();

mongoose.connect('mongodb://localhost:27017/bookDB');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));
app.use(express.json());
app.use(morgan('tiny'));


// POST Routes
app.put('/books/:id', async (req, res)=> {
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, {...req.body.book})
    res.redirect(`/books/${id}`);
});

app.post('/books', (req, res)=> {
    const {title, author, year,comment, isbn} = req.body.book;
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
app.get('/books/:id/edit', async(req,res) => {
    const book = await Book.findById(req.params.id).then(data => {
        return data;
    });
    res.render('books/edit', {book});
});

app.get('/books/newbook', (req,res) => {
    res.render('books/newbook');
});

app.get('/books/:id', async (req, res)=> {
    const { id } = req.params;
    const book = await Book.findById(id).then(data => {
        return data;
    });
    res.render('books/show', {book});
});

app.get('/books', async (req, res)=> {
    const books = await Book.find({}).then( data => {
        return data;
    });
    res.render('books/index', {books});
});

app.get('/', (req, res)=> {
    res.render('home');
});

//Middleware
app.use((req, res) => {
    res.status(404).send('NOT FOUND!!');
})

app.listen(8000, () => {
    console.log("On port 8000 personal library");
});