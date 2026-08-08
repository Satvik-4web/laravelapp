# Student CRUD Module

A simple Student CRUD application built using Laravel.

## Features

- Add a student
- View all students
- Edit student details
- Delete a student
- Store student data in a database

## Student Fields

- First Name
- Last Name
- Email
- Mobile
- City

## Technologies Used

- Laravel
- PHP
- MySQL
- Blade
- Git & GitHub

## CRUD Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/students` | View students |
| GET | `/students/create` | Add student |
| POST | `/students` | Store student |
| GET | `/students/edit/{id}` | Edit student |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

## Project Structure

```text
app/
 ├── Http/Controllers/StudentController.php
 └── Models/Student.php

database/
 └── migrations/

resources/
 └── views/
     └── students/
         ├── index.blade.php
         ├── create.blade.php
         └── edit.blade.php

routes/
 └── web.php
