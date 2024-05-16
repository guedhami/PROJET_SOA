//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//load mongoose
const mongoose = require("mongoose");
require("./Book");
const Book = mongoose.model("Book");

// Kafka :
const { connectProducer, sendMessage } = require('./kafkaProducer');
const { consumeMessages } = require('./kafkaConsumer');

connectProducer().then(() => {
  console.log('Kafka Producer connected successfully');
}).catch(err => {
  console.error('Failed to connect Kafka Producer:', err);
});

consumeMessages('book-topic').then(() => {
  console.log('Kafka Consumer is running');
}).catch(err => {
  console.error('Failed to start Kafka Consumer:', err);
});

// connect to db

mongoose
  .connect(
    "mongodb+srv://hayderguedhami:123456Hayder@cluster0.fxebywo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Books Microservice Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("this is our book Microservice main endpoint !");
});

// Create Book
app.post("/book", (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    pages: req.body.pages,
    category: req.body.category,
    available: req.body.available,
  };
  // create a new Book
  var book = new Book(newBook);
  book
    .save()
    .then(() => {
      console.log("New book created !");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send(" A new book created with sucess");
  res.send(book);
});

// Fetch Books
app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// Fetch Book by id
app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
// Delete Book by id
app.delete("/book/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Book Removed With success!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});
// Update Book by ID
app.put("/book/:id", (req, res) => {
  const updatedBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    pages: req.body.pages,
    category: req.body.category,
    available: req.body.available,
  };

  Book.findByIdAndUpdate(req.params.id, updatedBook, { new: true })
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).send("Failed to update book");
      }
    });
});