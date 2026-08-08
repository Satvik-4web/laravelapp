# Student CRUD Module

A simple Student Management CRUD application built using Laravel.

This project was developed as part of a practical assignment to understand the basic Laravel architecture, database migrations, models, controllers, routing, Blade views, and CRUD operations.

---

## Features

The application provides complete CRUD functionality for managing student records.

- Add a new student
- View all students
- Edit student information
- Delete a student
- Store student data in a database
- Success messages after CRUD operations
- Form validation for student details

---

## Student Information

Each student record contains:

| Field | Description |
|---|---|
| ID | Unique student ID |
| First Name | Student's first name |
| Last Name | Student's last name |
| Email | Student's email address |
| Mobile | Student's mobile number |
| City | Student's city |
| Created At | Record creation time |
| Updated At | Last update time |

---

## Technologies Used

- **Laravel 13**
- **PHP 8.4**
- **MySQL**
- **Blade Templates**
- **Git**
- **GitHub**
- **HTML & CSS**

---

## Project Structure

```text
student-crud/
│
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── StudentController.php
│   │
│   └── Models/
│       └── Student.php
│
├── database/
│   └── migrations/
│       └── create_students_table.php
│
├── resources/
│   └── views/
│       └── students/
│           ├── index.blade.php
│           ├── create.blade.php
│           └── edit.blade.php
│
├── routes/
│   └── web.php
│
├── public/
│
├── storage/
│
├── tests/
│
├── artisan
├── composer.json
└── README.md
