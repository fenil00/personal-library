const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Book = require('./models/book');
const morgan = require('morgan');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');
const {bookSchema}= require('./schemas.js')
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

const validateBook = (req, res, next) => {
    const {error} = bookSchema.validate(req.body);
    console.log(req.body.book);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
}

// POST Routes
app.put('/books/:id', catchAsync(async (req, res)=> {
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, {...req.body.book})
    res.redirect(`/books/${id}`);
}));

app.post('/books', validateBook, catchAsync(async (req, res, next)=> {
       
        const book = new Book({...req.body.book});
        await  book.save();
        res.redirect('/books'); 
}));

app.post('/books/:id/newcomment', catchAsync(async (req, res)=> {
    const { id } =  req.params;
    const { comment } = req.body;
    const b  = await Book.findById(id).then(data => {
        return data;
    });
    b.comments.push(comment);
    b.save();
    res.redirect(`/books/${id}`);
}));

app.delete('/books/:id', catchAsync(async (req, res)=> {
    const { id } =  req.params;
    const b  = await Book.findByIdAndDelete(id).then(data => {
        return data;
    });
    //console.log(b);
    
    res.redirect(`/books`);
}));

// GET Routes
app.get('/books/:id/edit', catchAsync(async(req,res) => {
    const book = await Book.findById(req.params.id).then(data => {
        return data;
    });
    res.render('books/edit', {book});
}));

app.get('/books/newbook', (req,res) => {
    res.render('books/newbook');
});

app.get('/books/:id', catchAsync(async (req, res)=> {
    const { id } = req.params;
    const book = await Book.findById(id).then(data => {
        return data;
    });
    res.render('books/show', {book});
}));

app.get('/books', catchAsync(async (req, res)=> {
    const books = await Book.find({}).then( data => {
        return data;
    });
    res.render('books/index', {books});
}));

app.get('/', (req, res)=> {
    res.render('home');
});

app.all('*', (req,res,next) => {
   next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) {
        err.message = "Something went wrong !!";
    }
    res.status(statusCode).render('error', {err});
})

app.listen(8000, () => {
    console.log("On port 8000 personal library");
});