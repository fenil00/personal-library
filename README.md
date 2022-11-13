# personal-library
> I like to read books, so i decided to make home for my books. 
  
- [personal-library](#personal-library)
  - [Routes](#routes)
    - [GET Routes](#get-routes)
    - [POST Routes](#post-routes)
    - [PUT Routes](#put-routes)
    - [DELETE Routes](#delete-routes)
  - [Technologies](#technologies)
  - [Databases](#databases)
  - [Packages](#packages)
    - [Method Override](#method-override)

## Routes
* / ->for Home
  ### GET Routes ###
  * /books -> gets all the books 
  * /books/:id -> gets the specific book 
  * /books/newbook -> gets the form to add new book
  * /books/:id/edit -> gets the form for editing the book 

  ### POST Routes ###
  * /books -> saves the new book to database
  * /books/:id/newcomment -> adds the new comment to the book 

  ### PUT Routes ###
  * /books/:id -> updates the book from the edit form in database
  
  ### DELETE Routes ###
  * /books/:id -> deletes the book

## Technologies
* Node.js
* Express
  
## Databases
* MongoDB
* Mongoose
  
## Packages 
### Method Override ###
* `npm i method-override`
* `const methodOverride = require('method-override'); app.use(methodOverride('_method')); `
* Use it in form ` <form action="/books/<%=book._id%>?_method=PUT" method="post"></form>`