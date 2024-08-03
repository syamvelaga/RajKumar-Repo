const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv');
const { initDB } = require('./config/initializeDatabase');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await initDB(); // Wait for the database initialization to complete

        // Middlewares
        app.use(cors()); // Enable CORS
        app.use(bodyParser.json()); // Parse JSON request bodies

        // Routes
        app.use('/api/users', userRoutes);
        app.use('/api/todos', todoRoutes);

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the database or starting the server:', error.message);
        process.exit(1); // Exit the process with a failure code
    }
};

// Call the startServer function
startServer();
