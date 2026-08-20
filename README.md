# Student CRUD – Laravel REST API + Next.js

A Student Management System built using Laravel REST API and Next.js.

## Tech Stack

- Laravel
- PHP
- MySQL
- Next.js
- React
- Laravel Sanctum
- Postman

## Features

- User Registration
- User Login
- User Logout
- Authentication using Laravel Sanctum
- Student List
- Add Student
- Edit Student
- Delete Student
- Server-side Validation
- REST API Integration
- Protected API Routes

## Project Structure

### Backend

The Laravel backend provides REST APIs for authentication and student CRUD operations.

### Frontend

The Next.js frontend provides the Student Management interface and communicates with the Laravel REST API.

## Backend Setup

### 1. Install Dependencies

composer install

### 2. Configure Environment

Create the .env file and configure the database credentials.

cp .env.example .env

### 3. Generate Application Key

php artisan key:generate

### 4. Run Database Migrations

php artisan migrate

### 5. Start Laravel Server

php artisan serve

Backend runs at:

http://127.0.0.1:8000

## Frontend Setup

### 1. Go to Frontend Directory

cd frontend

### 2. Install Dependencies

npm install

### 3. Start Next.js Development Server

npm run dev

Frontend runs at:

http://localhost:3000

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register | Register a new user |
| POST | /api/login | Login user |
| POST | /api/logout | Logout authenticated user |
| GET | /api/user | Get authenticated user |

### Student CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| POST | /api/students | Add a new student |
| GET | /api/students/{id} | Get a specific student |
| PUT | /api/students/{id} | Update a student |
| DELETE | /api/students/{id} | Delete a student |

## Validation

Server-side validation is implemented using Laravel validation.

The student data includes validation for:

- First Name
- Last Name
- Email
- Mobile
- City

Invalid data is rejected by the Laravel API with an appropriate validation error message.

## Authentication

The application uses Laravel Sanctum for API authentication.

Protected API routes require a valid authentication token.

Unauthenticated requests are rejected by the Laravel API.

## Testing

The REST APIs were tested using Postman.

The following operations were tested:

- User Registration
- User Login
- Get Authenticated User
- Student CRUD Operations
- User Logout
- Authentication Protection
- Server-side Validation

The Next.js frontend was tested for:

- Login
- Student Listing
- Adding Students
- Editing Students
- Deleting Students
- Validation
- Logout

## Student CRUD Operations

The application supports complete CRUD functionality:

1. Create a new student
2. View the student list
3. Edit student information
4. Delete a student

All operations are performed through the Laravel REST API and displayed through the Next.js frontend.

## Git Branch

feature/student-api-nextjs

## Project Demo

The project demonstrates:

1. User Login
2. Student List
3. Add Student
4. Edit Student
5. Delete Student
6. Server-side Validation
7. Logout

## Project URLs

Frontend:

http://localhost:3000

Backend API:

http://127.0.0.1:8000/api