<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;

use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| Public Authentication Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/me', [AuthController::class, 'me']);

    // Bonus: Change Password
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Dashboard Endpoints with Role-Based Access Control
    Route::get('/admin/dashboard', [DashboardController::class, 'admin'])
        ->middleware('role:Admin');
    Route::get('/principal/dashboard', [DashboardController::class, 'principal'])
        ->middleware('role:Principal,Admin');
    Route::get('/hod/dashboard', [DashboardController::class, 'hod'])
        ->middleware('role:HOD,Admin');
    Route::get('/faculty/dashboard', [DashboardController::class, 'faculty'])
        ->middleware('role:Faculty,Admin');
    Route::get('/student/dashboard', [DashboardController::class, 'student'])
        ->middleware('role:Student,Admin');

    // Student CRUD
    Route::get('/students', [StudentController::class, 'index'])
        ->middleware('role:Admin,Principal,HOD,Faculty')
        ->name('students.index');

    Route::post('/students', [StudentController::class, 'store'])
        ->middleware('role:Admin,Principal,HOD,Faculty')
        ->name('students.store');

    Route::get('/students/{student}', [StudentController::class, 'show'])
        ->middleware('role:Admin,Principal,HOD,Faculty')
        ->name('students.show');

    Route::put('/students/{student}', [StudentController::class, 'update'])
        ->middleware('role:Admin,Principal,HOD,Faculty')
        ->name('students.update');

    Route::patch('/students/{student}', [StudentController::class, 'update'])
        ->middleware('role:Admin,Principal,HOD,Faculty');

    Route::delete('/students/{student}', [StudentController::class, 'destroy'])
        ->middleware('role:Admin,Principal,HOD,Faculty')
        ->name('students.destroy');
});