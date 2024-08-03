# Todo Application Backend

## Project Description

This project is a backend for a Todo application, providing RESTful API endpoints to handle user authentication, CRUD operations on todo items, and more. The backend is built using Node.js, Express, and SQLite as the database. The project follows a structured and scalable architecture, with separate files for routes, controllers, models, and configuration.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Best Practices](#best-practices)

## Features

- User Registration and Authentication
- CRUD Operations on Todos
- JWT-based Authentication
- Input Validation and Error Handling
- Structured and Modular Codebase

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: Cors, Body-Parser, Dotenv

## Setup and Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/todo-backend.git
   cd todo-backend

2. **Install Dependencies**:
   npm install

3. **Set up environment variables:**
   - Create a .env file in the root of the project.
   - Add the following environment variables:
      - PORT=3000
      - JWT_SECRET=your_jwt_secret

4. **Run the server:**
   npm start
    - The server will start on http://localhost:3000.

## Database Schema

### User Table

| Column | Type | Description|
| ------ | ------ | ----- |
| id | INTEGER | Primary key, auto incremented |
| username | TEXT | UNIQUE NOT NULL |
| email | TEXT | UNIQUE NOT NULL |
| password | TEXT | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Todos Table

| Column | Type | Description|
| ------ | ------ | ----- |
| id | INTEGER | Primary key, auto incremented |
| user_id | TEXT | UNIQUE NOT NULL |
| title | TEXT | UNIQUE NOT NULL |
| description | TEXT | NOT NULL |
| completed | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| FOREIGN KEY | (user_id) | REFERENCES users (id) |

## API Routes

### User Routes
- POST /api/user/register: Register a new user.
- POST /api/user/login: Log in a user.

### Todo Routes

- GET /api/todos: Get all todos for the authenticated user.
- GET /api/todos/: Get a specific todo by ID.
- POST /api/todos/create-todo: Create a new todo.
- PUT /api/todos/update/:id: Update an existing todo by ID.
- DELETE /api/todos/delete/:id: Delete a todo by ID.

### Authentication Middleware
- All todo routes are protected and require a valid JWT token

## Best Practices

Error Handling: Comprehensive error handling is implemented using try-catch blocks and appropriate status codes.
Environment Variables: Sensitive information like JWT secrets is stored in environment variables.
Code Modularity: The code is divided into modules (routes, controllers, models) for better maintainability.
Input Validation: All incoming data is validated to ensure security and data integrity.