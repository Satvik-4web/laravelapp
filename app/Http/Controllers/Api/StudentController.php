<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(Student::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'mobile' => 'required|string|max:20',
            'city' => 'required|string|max:255',
        ]);

        $student = Student::create($validated);

        return response()->json($student, 201);
    }

    public function show(string $id)
    {
        $student = Student::findOrFail($id);

        return response()->json($student);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'mobile' => 'required|string|max:20',
            'city' => 'required|string|max:255',
        ]);

        $student = Student::findOrFail($id);

        $student->update($validated);

        return response()->json($student);
    }

    public function destroy(string $id)
    {
        $student = Student::findOrFail($id);

        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully'
        ]);
    }
}
