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

// --- TASK 11: Get all books using Async/Await and Axios ---
// This function retrieves the full list of books available in the shop.
// It uses Axios to make a GET request to the root endpoint.
// It uses a try-catch block for proper error handling.
const getAllBooks = async () => {
    try {
        // Await the axios GET request to retrieve all books
        const response = await axios.get('http://localhost:5000/');
        // Return the data which contains the books
        return response.data;
    } catch (error) {
        // Log the error message if the request fails
        console.error("Error fetching all books:", error.message);
        throw error;
    }
};

// --- TASK 12: Get book details based on ISBN using Async/Await and Axios ---
// This function fetches the details of a specific book by its ISBN.
// It takes the ISBN as a parameter and appends it to the API endpoint.
const getBookByISBN = async (isbn) => {
    try {
        // Await the axios GET request to retrieve the book by ISBN
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        // Return the book details from the response
        return response.data;
    } catch (error) {
        // Log the error message if the book is not found or request fails
        console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        throw error;
    }
};

// --- TASK 13: Get book details based on Author using Async/Await and Axios ---
// This function fetches the details of a book based on the author's name.
// It properly handles the author parameter and filters the book data.
const getBookByAuthor = async (author) => {
    try {
        // Await the axios GET request to retrieve the book by author
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        // Return the filtered book data
        return response.data;
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error(`Error fetching book by author ${author}:`, error.message);
        throw error;
    }
};

// --- TASK 14: Get book details based on Title using Async/Await and Axios ---
// This function retrieves book details based on the provided title.
// It handles the title parameter properly to fetch the matching book.
const getBookByTitle = async (title) => {
    try {
        // Await the axios GET request to retrieve the book by title
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        // Return the matching book data
        return response.data;
    } catch (error) {
        // Handle and log errors if the title is not found
        console.error(`Error fetching book by title ${title}:`, error.message);
        throw error;
    }
};

module.exports.general = public_users;
