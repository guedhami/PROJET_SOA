const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Kafka
const { connectProducer, sendMessage } = require("./kafkaProducer");
const { consumeMessages } = require("./kafkaConsumer");

connectProducer().then(() => {
  console.log("Kafka Producer connected successfully");
}).catch(err => {
  console.error("Failed to connect Kafka Producer:", err);
});

consumeMessages("book-topic").then(() => {
  console.log("Kafka Consumer is running");
}).catch(err => {
  console.error("Failed to start Kafka Consumer:", err);
});

// MongoDB connection
const MONGODB = 'mongodb+srv://hayderguedhami:123456Hayder@cluster0.fxebywo.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db connected");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

// Load models
const user = require("./user");

const app = express();
app.use(bodyParser.json());

// REST API
app.get("/users", async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const foundUser = await user.findById(req.params.id);
    if (!foundUser) return res.status(404).json({ error: "User not found" });
    res.json(foundUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  const newUser = new user({ name, email, age, createdAt: new Date().toISOString() });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});
 