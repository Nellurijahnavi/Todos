const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./Rotues/TodoRoutes');

// Create an express app
const app = express();
const PORT = 5000;
const cors = require('cors');

// Use cors middleware
app.use(cors());

// Middleware
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
app.use('/todos', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
