<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('students', StudentController::class);

    Route::middleware('role:Admin')->get('/admin/dashboard', function () {
        return response()->json(['message' => 'Welcome to the Admin dashboard']);
    });

    Route::middleware('role:Admin,Principal')->get('/principal/dashboard', function () {
        return response()->json(['message' => 'Welcome to the Principal dashboard']);
    });

    Route::middleware('role:Admin,Principal,HOD')->get('/hod/dashboard', function () {
        return response()->json(['message' => 'Welcome to the HOD dashboard']);
    });

    Route::middleware('role:Admin,Principal,HOD,Faculty')->get('/faculty/dashboard', function () {
        return response()->json(['message' => 'Welcome to the Faculty dashboard']);
    });

    Route::middleware('role:Admin,Principal,HOD,Faculty,Student')->get('/student/dashboard', function () {
        return response()->json(['message' => 'Welcome to the Student dashboard']);
    });
});