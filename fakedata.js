const { v4: uuidv4 } = require('uuid');

const books = [
    {
        _id : uuidv4(),
        title : "book1",
        author: "auth1",
        ISBN : "123456789",
        comments : ["comment1", "blabla"]
    },
    {
        _id : uuidv4(),
        title : "book2",
        author: "auth2",
        ISBN : "123456789",
        comments : ["comment1", "blabla"]
    },
    {
        _id : uuidv4(),
        title : "book3",
        author: "auth4",
        ISBN : "123456789",
        comments : ["comment1", "blabla"]
    }
];

module.exports.books = books;