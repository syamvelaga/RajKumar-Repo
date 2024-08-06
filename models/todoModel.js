const { db } = require('../config/initializeDatabase');

const createTodo = async (userId, title, description) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)', [userId, title, description], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

// get todos from table
const getAllTodos = async (userId) => {
    try {
        const todos = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos WHERE user_id = ?', [userId], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
        // console.log('all todos: ', todos, userId)
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        throw new Error('Failed to fetch todos');
    }
};


const getTodoById = async (userId, todoId) => {
    try {
        const todo = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM todos WHERE user_id = ? AND id = ?', [userId, todoId], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });

        return todo;
    } catch (error) {
        console.error('Error fetching todo:', error.message);
        throw new Error('Failed to fetch todo');
    }
};


const updateOneTodo = async (userId, todoId, updatedData) => {
    try {
        // Start constructing the SQL query and parameters
        let query = 'UPDATE todos SET ';
        const params = [];

        // Dynamically build the query and params based on provided fields
        if (updatedData.title) {
            query += 'title = ?, ';
            params.push(updatedData.title);
        }
        if (updatedData.description) {
            query += 'description = ?, ';
            params.push(updatedData.description);
        }
        if (typeof updatedData.completed !== 'undefined') {
            query += 'completed = ?, ';
            params.push(updatedData.completed);
        }

        // Remove trailing comma and space
        query = query.slice(0, -2);

        // Add WHERE clause
        query += ' WHERE user_id = ? AND id = ?';
        params.push(userId, todoId);

        // Execute the query
        const result = await new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    return reject(err);
                }

                if (this.changes === 0) {
                    return reject(new Error('Todo not found or no changes made'));
                }

                resolve({ id: todoId, ...updatedData });
            });
        });

        return result;
    } catch (error) {
        console.error('Error updating todo:', error.message);
        throw new Error('Failed to update todo');
    }
};

// Assuming you're using Express and SQLite
// const updateTodoStatus = async (userId, todoId, completedStatus) => {
//     try {
//         const query = 'UPDATE todos SET completed = ? WHERE user_id = ? AND id = ?';
//         const params = [completedStatus, userId, todoId];

//         const result = await new Promise((resolve, reject) => {
//             db.run(query, params, function (err) {
//                 if (err) {
//                     return reject(err);
//                 }

//                 if (this.changes === 0) {
//                     return reject(new Error('Todo not found or no changes made'));
//                 }

//                 resolve({ id: todoId, completed: completedStatus });
//             });
//         });

//         return { message: 'Todo status updated successfully', todo: result };
//     } catch (error) {
//         console.error('Error updating todo status:', error.message);
//         throw new Error('Failed to update todo status');
//     }
// };



const deleteTodo = async (userId, todoId) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM todos WHERE user_id = ? AND id = ?', [userId, todoId], function (err) {
            if (err) {
                return reject(err);
            }
            if (this.changes === 0) {
                return reject(new Error('Todo not found or not deleted'));
            }
            resolve({ message: 'Todo deleted successfully', changes: this.changes });
        });
    });
};



module.exports = { createTodo, getAllTodos, getTodoById, updateOneTodo, deleteTodo};
