const express = require('express');
const router = express.Router();
const { addTodo, readAllTodos, readSpecificTodo, updateTodoById, deleteTodoById} = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route for creating a todo
router.post('/create-todo', authMiddleware, addTodo);

// Route for getting all todos
router.get('/', authMiddleware, readAllTodos);

// Route for getting a specific todo by id
router.get('/:id', authMiddleware, readSpecificTodo);

// Route for updating a todo by id
router.put('/update/:id', authMiddleware, updateTodoById);

// // Route for updating the status of a todo
// router.put('/update-status/:id', authMiddleware, updateStatusOfTodo);

// Route for deleting a todo by id
router.delete('/delete/:id', authMiddleware, deleteTodoById);

module.exports = router;
