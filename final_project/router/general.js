const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// TASK 11: Get the book list available in the shop using Promise
public_users.get('/', function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books, null, 4)));
    });
    get_books.then(() => console.log("Promise for Task 11 resolved"));
});

// TASK 12: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        if (books[isbn]) {
            resolve(res.send(books[isbn]));
        } else {
            reject(res.status(404).json({message: "Book not found"}));
        }
    });
    get_book.then(() => console.log("Promise for Task 12 resolved"));
});
  
// TASK 13: Get book details based on author using Promise
public_users.get('/author/:author', function (req, res) {
    const get_books_author = new Promise((resolve, reject) => {
        const author = req.params.author;
        let ans = [];
        for (const [key, values] of Object.entries(books)) {
            if (values.author === author) {
                ans.push(books[key]);
            }
        }
        if (ans.length > 0) {
            resolve(res.send(ans));
        } else {
            reject(res.status(404).json({message: "Author not found"}));
        }
    });
    get_books_author.then(() => console.log("Promise for Task 13 resolved"));
});

// TASK 14: Get all books based on title using Promise
public_users.get('/title/:title', function (req, res) {
    const get_books_title = new Promise((resolve, reject) => {
        const title = req.params.title;
        let ans = [];
        for (const [key, values] of Object.entries(books)) {
            if (values.title === title) {
                ans.push(books[key]);
            }
        }
        if (ans.length > 0) {
            resolve(res.send(ans));
        } else {
            reject(res.status(404).json({message: "Title not found"}));
        }
    });
    get_books_title.then(() => console.log("Promise for Task 14 resolved"));
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
      res.send(books[isbn].reviews);
  } else {
      res.status(404).json({message: "Unable to find book!"});
  }
});

module.exports.general = public_users;
