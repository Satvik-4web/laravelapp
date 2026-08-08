# Student CRUD Module

A simple Student Management CRUD application built using Laravel.

This project was developed as part of a practical assignment to understand Laravel architecture, database migrations, models, controllers, routes, Blade views, and CRUD operations.

## Features

- Add a new student
- View all students
- Edit student information
- Delete student
- Store student information in a database
- Form validation
- Success messages after operations

## Student Information

The application stores the following information:

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

## Technologies Used

- Laravel 13
- PHP 8.4
- MySQL
- Blade Templates
- HTML
- CSS
- Git
- GitHub

## Project Structure

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
    ├── storage/
    ├── tests/
    ├── artisan
    ├── composer.json
    └── README.md

## CRUD Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/students` | View all students |
| GET | `/students/create` | Open add student form |
| POST | `/students` | Create a student |
| GET | `/students/edit/{id}` | Open edit form |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

## How It Works

### 1. View Students

The `/students` route displays all students stored in the database.

    GET /students

The `StudentController` retrieves the student records using the `Student` model and sends them to the Blade view.

### 2. Add Student

The user can click the **Add Student** button to open the student form.

    GET /students/create

After submitting the form, the data is sent to:

    POST /students

The controller validates the information and creates a new student record.

### 3. Edit Student

Each student has an **Edit** button.

    GET /students/edit/{id}

The existing information is loaded into the edit form.

After making changes, the form sends:

    PUT /students/{id}

The student information is then updated in the database.

### 4. Delete Student

Each student has a **Delete** button.

    DELETE /students/{id}

The selected student record is deleted from the database.

## Database

The project uses a `students` table.

The table contains:

    id
    first_name
    last_name
    email
    mobile
    city
    created_at
    updated_at

The table is created using a Laravel migration.

## Validation

Student information is validated before it is stored.

Example validation rules:

    $request->validate([
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'required|email',
        'mobile' => 'required',
        'city' => 'required',
    ]);

## Running the Project

### 1. Clone the Repository

    git clone https://github.com/Satvik-4web/laravelapp.git

### 2. Open the Project

    cd laravelapp

### 3. Install Dependencies

    composer install

### 4. Create the Environment File

    copy .env.example .env

### 5. Generate Application Key

    php artisan key:generate

### 6. Configure the Database

Open the `.env` file and configure your MySQL database.

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=student_crud
    DB_USERNAME=root
    DB_PASSWORD=

### 7. Run the Migration

    php artisan migrate

### 8. Start the Laravel Server

    php artisan serve

Open the application at:

    http://127.0.0.1:8000

Student CRUD page:

    http://127.0.0.1:8000/students

## Git Branch

The project was developed on:

    feature/student-crud

## Git Commit

The completed Student CRUD module was committed using:

    Completed Student CRUD Module

## CRUD Operations

The application implements the complete CRUD cycle:

    Create → Read → Update → Delete

### Create

Add a new student using the student registration form.

### Read

View all students on the Student List page.

### Update

Edit existing student information.

### Delete

Remove a student record from the database.

## Learning Outcomes

Through this project, I learned and implemented:

- Laravel MVC architecture
- Laravel routing
- Controllers
- Eloquent models
- Database migrations
- Blade templates
- Form handling
- Form validation
- MySQL database operations
- CRUD functionality
- Git branching
- Git commits
- GitHub repository management

## Author

**Satvik**

Student CRUD Module  
Built using Laravel.
