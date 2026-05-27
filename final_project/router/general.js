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
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
      resolve(books);
  })
  .then((bookList) => {
      res.send(JSON.stringify(bookList, null, 4));
  })
  .catch((error) => {
      res.status(500).json({message: "Error retrieving books", error: error.message});
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
      if (books[isbn]) {
          resolve(books[isbn]);
      } else {
          reject(new Error("Book not found"));
      }
  })
  .then((book) => {
      res.send(book);
  })
  .catch((error) => {
      res.status(404).json({message: error.message});
  });
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve, reject) => {
      let ans = [];
      for(const [key, values] of Object.entries(books)){
          if(values.author === author){
              ans.push(books[key]);
          }
      }
      if(ans.length > 0) {
          resolve(ans);
      } else {
          reject(new Error("Author not found"));
      }
  })
  .then((ans) => {
      res.send(ans);
  })
  .catch((error) => {
      res.status(404).json({message: error.message});
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve, reject) => {
      let ans = [];
      for(const [key, values] of Object.entries(books)){
          if(values.title === title){
              ans.push(books[key]);
          }
      }
      if(ans.length > 0) {
          resolve(ans);
      } else {
          reject(new Error("Title not found"));
      }
  })
  .then((ans) => {
      res.send(ans);
  })
  .catch((error) => {
      res.status(404).json({message: error.message});
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

// Task 10-14: Axios examples
const axios = require('axios');

// Task 11: Add the code for getting the list of books available in the shop (using Promise callbacks or async-await with Axios)
const getBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error.message);
        throw error;
    }
};

// Task 12: Add the code for getting the book details based on ISBN (using Promise callbacks or async-await with Axios)
const getBookByISBN = async (isbn) => {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        throw error;
    }
};

// Task 13: Add the code for getting the book details based on Author (using Promise callbacks or async-await with Axios)
const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book by author ${author}:`, error.message);
        throw error;
    }
};

// Task 14: Add the code for getting the book details based on Title (using Promise callbacks or async-await with Axios)
const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book by title ${title}:`, error.message);
        throw error;
    }
};

module.exports.general = public_users;
