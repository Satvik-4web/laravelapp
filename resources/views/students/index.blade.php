<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background: #f5f5f5;
        }

        .container {
            max-width: 1100px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
        }

        h1 {
            margin-bottom: 20px;
        }

        a, button {
            padding: 8px 14px;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .add-btn {
            background: #2563eb;
            color: white;
        }

        .edit-btn {
            background: #f59e0b;
            color: white;
        }

        .delete-btn {
            background: #dc2626;
            color: white;
        }

        table {
            width: 100%;
            margin-top: 25px;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background: #111827;
            color: white;
        }

        .success {
            padding: 12px;
            margin-top: 20px;
            background: #dcfce7;
            color: #166534;
            border-radius: 5px;
        }

        .actions {
            display: flex;
            gap: 8px;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Student List</h1>

    <a href="{{ route('students.create') }}" class="add-btn">
        + Add Student
    </a>

    @if(session('success'))
        <div class="success">
            {{ session('success') }}
        </div>
    @endif

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>

        @forelse($students as $student)

            <tr>
                <td>{{ $student->id }}</td>
                <td>{{ $student->first_name }}</td>
                <td>{{ $student->last_name }}</td>
                <td>{{ $student->email }}</td>
                <td>{{ $student->mobile }}</td>
                <td>{{ $student->city }}</td>

                <td>
                    <div class="actions">

                        <a
                            href="{{ route('students.edit', $student->id) }}"
                            class="edit-btn">
                            Edit
                        </a>

                        <form
                            action="{{ route('students.destroy', $student->id) }}"
                            method="POST"
                            onsubmit="return confirm('Are you sure you want to delete this student?');">

                            @csrf
                            @method('DELETE')

                            <button type="submit" class="delete-btn">
                                Delete
                            </button>

                        </form>

                    </div>
                </td>
            </tr>

        @empty

            <tr>
                <td colspan="7">
                    No students found.
                </td>
            </tr>

        @endforelse

        </tbody>
    </table>

</div>

</body>
</html>