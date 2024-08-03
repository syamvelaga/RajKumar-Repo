const { createTodo, getAllTodos, getTodoById, updateOneTodo, deleteTodo } = require('../models/todoModel');

const addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const {userId} = req; // Extracted from JWT middleware
        // console.log('user id: ', userId)
        const todo = await createTodo(userId, title, description);
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error adding todo:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// read the todos 
const readAllTodos = async (req, res) => {
    try {
        const {userId} = req;
        // console.log('user id: ', userId)
        const todo = await getAllTodos(userId);
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error getting todos:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// function to read the specific todo

const readSpecificTodo = async (req, res) => {
    
    try {
        const {userId} = req;
        const {id} = req.params
        // console.log('paramID: ', id)
        // console.log('user id: ', userId)
        const todo = await getTodoById(userId, id);
        if (!todo){
            return res.status(404).json({message: "Todo Not Found"})
        }
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error getting todo:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// function to update the todo by id

const updateTodoById = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;
        const { title, description, completed } = req.body;

        // Construct updatedData object with only defined fields
        const updatedData = {};
        if (title !== undefined) updatedData.title = title;
        if (description !== undefined) updatedData.description = description;
        if (completed !== undefined) updatedData.completed = completed;

        // Log for debugging
        // console.log('paramID: ', id);
        // console.log('user id: ', userId);
        // console.log('updated Data: ', updatedData);

        // Call the function to update the todo
        const updatedTodo = await updateOneTodo(userId, id, updatedData);

        // Send response back to client
        res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error) {
        console.error('Error updating todo: ', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// function to update the status of the todo

// const updateStatusOfTodo = async (req, res) => {
//     const { userId } = req; // Assuming user ID is attached to req.user from authentication middleware
//     const todoId = parseInt(req.params.id);
//     const { completed } = req.body;

//     try {
//         const result = await updateTodoStatus(userId, todoId, completed);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
const deleteTodoById = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;

        // Call the deleteTodo function with userId and todoId
        await deleteTodo(userId, id);

        // Send a 204 No Content response after successful deletion
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = { addTodo, readAllTodos, readSpecificTodo, updateTodoById, deleteTodoById}
