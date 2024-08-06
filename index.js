const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv');
const { initDB } = require('./config/initializeDatabase');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

env.config();

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    optionsSuccessStatus: 200
};


const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await initDB(); // Wait for the database initialization to complete

        // Middlewares
        app.use(cors(corsOptions)); // Enable CORS
        app.use(bodyParser.json()); // Parse JSON request bodies

        // Routes
        app.use('/api/users', userRoutes);
        app.use('/api/todos', todoRoutes);

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running1 on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the database or starting the server:', error.message);
        process.exit(1); // Exit the process with a failure code
    }
};

// Call the startServer function
startServer();
