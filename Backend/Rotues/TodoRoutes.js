const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/TodoControllers');

// Define routes
router.get('/', todoController.getAllTodos);  // Get all todos
router.get('/:id', todoController.getTodoById); // Get todo by ID
router.post('/', todoController.createTodo);  // Create a new todo
router.put('/:id', todoController.updateTodo);  // Update todo by ID
router.delete('/:id', todoController.deleteTodo); // Delete todo by ID

module.exports = router;
