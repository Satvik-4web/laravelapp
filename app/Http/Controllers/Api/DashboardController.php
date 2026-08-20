<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin(Request $request)
    {
        return response()->json([
            'message' => 'Welcome to the Admin Dashboard',
            'data' => [
                'role_info' => 'Full system administration access.',
                'stats' => [
                    'system_status' => 'healthy',
                    'total_users' => 5,
                ]
            ]
        ]);
    }

    public function principal(Request $request)
    {
        return response()->json([
            'message' => 'Welcome to the Principal Dashboard',
            'data' => [
                'role_info' => 'Institution-level overview and insights.',
                'stats' => [
                    'institution_performance' => 'Excellent',
                ]
            ]
        ]);
    }

    public function hod(Request $request)
    {
        return response()->json([
            'message' => 'Welcome to the HOD Dashboard',
            'data' => [
                'role_info' => 'Department-level management controls.',
                'department' => 'Computer Science & Engineering',
            ]
        ]);
    }

    public function faculty(Request $request)
    {
        return response()->json([
            'message' => 'Welcome to the Faculty Dashboard',
            'data' => [
                'role_info' => 'Academic tasks and student grading interface.',
                'assigned_classes' => ['CS101', 'CS202'],
            ]
        ]);
    }

    public function student(Request $request)
    {
        return response()->json([
            'message' => 'Welcome to the Student Dashboard',
            'data' => [
                'role_info' => 'View personal academic records and profile details.',
                'enrolled_courses' => ['Mathematics', 'Physics', 'Computer Science'],
            ]
        ]);
    }
}
