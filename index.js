const express = require('express');
const app = express();
const path = require('path');
const books = require('./fakedata');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

// POST Routes
app.post('/books/newbook', (req, res)=> {
    const {title, author, comment, isbn} = req.body;
    const comments = new Array(comment);
    books.books.push({_id : uuidv4(), title: title, author : author, ISBN:isbn,comments : comments })
    res.redirect('/books');
});

app.post('/books/:id/newcomment', (req, res)=> {
    const { id } =  req.params;
    const { comment } = req.body;
    const b  = books.books.find(i => i._id == id);
    b.comments.push(comment);
    
    res.redirect(`/books/${id}`);
});

app.delete('/books/:id', (req, res)=> {
    const { id } =  req.params;
    const b  = books.books.find(i => i._id == id);
    books.books.pop(b);
    
    res.redirect(`/books`);
});

// GET Routes
app.get('/books/newbook', (req,res) => {
    res.render('newbook');
});

app.get('/books/:id', (req, res)=> {
    const { id } = req.params;
    const book = books.books.find(i => i._id === id);
    res.render('show', {book});
});

app.get('/books', (req, res)=> {
    res.render('books', {books});
});

app.get('/', (req, res)=> {
    res.render('home');
});

app.listen(8000, () => {
    console.log("On port 8000 personal library");
});