# Digital Diary - MERN Stack Application

A full-stack web application for personal diary management with user authentication.

## Features

- User Registration and Login
- JWT Authentication
- Create, Read, Update, Delete diary entries
- Responsive design
- Protected routes

## Technology Stack

**Frontend:**
- React JS
- React Router DOM
- Axios
- CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt

## Setup Instructions

### Backend Setup
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with MongoDB connection string and JWT secret
4. Start server: `npm start`

### Frontend Setup
1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Diary
- GET `/api/diary` - Get all diary entries
- POST `/api/diary` - Create new diary entry
- PUT `/api/diary/:id` - Update diary entry
- DELETE `/api/diary/:id` - Delete diary entry