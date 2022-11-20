const { v4: uuidv4 } = require('uuid');

const bookSeed = [
    {
        title: "book1",
        author: "auth1",
        year: 1995,
        ISBN: "123456789",
        description : "This is book 1",
        comments: ["comment1", "blabla"],
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDM4ODV8MHwxfHNlYXJjaHwxfHxib29rc3xlbnwwfHx8fDE2Njg5MzkyMjU&ixlib=rb-4.0.3&q=80&w=400"
    },
    {
        title: "book2",
        author: "auth2",
        year: 1996,
        ISBN: "123456789",
        description : "This is book 2",
        comments: ["comment2", "blabla"],
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDM4ODV8MHwxfHNlYXJjaHwxfHxib29rc3xlbnwwfHx8fDE2Njg5MzkyMjU&ixlib=rb-4.0.3&q=80&w=400"
    },
    {
        title: "book3",
        author: "auth3",
        year: 1997,
        ISBN: "123456789",
        description : "This is book 3",
        comments: ["comment3", "blabla"],
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDM4ODV8MHwxfHNlYXJjaHwxfHxib29rc3xlbnwwfHx8fDE2Njg5MzkyMjU&ixlib=rb-4.0.3&q=80&w=400"
    }
];

module.exports.bookSeed = bookSeed;