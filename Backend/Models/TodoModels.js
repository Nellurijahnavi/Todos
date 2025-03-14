const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Create a Todo model from the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
