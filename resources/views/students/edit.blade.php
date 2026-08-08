<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Edit Student</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            margin: 40px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            margin-bottom: 15px;
            box-sizing: border-box;
        }

        button, a {
            padding: 10px 16px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
        }

        button {
            background: #f59e0b;
            color: white;
        }

        a {
            background: #6b7280;
            color: white;
        }

        .error {
            color: red;
            margin-bottom: 15px;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Edit Student</h1>

    @if($errors->any())
        <div class="error">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form
        action="{{ route('students.update', $student->id) }}"
        method="POST">

        @csrf
        @method('PUT')

        <label>First Name</label>

        <input
            type="text"
            name="first_name"
            value="{{ old('first_name', $student->first_name) }}"
            required
        >

        <label>Last Name</label>

        <input
            type="text"
            name="last_name"
            value="{{ old('last_name', $student->last_name) }}"
            required
        >

        <label>Email</label>

        <input
            type="email"
            name="email"
            value="{{ old('email', $student->email) }}"
            required
        >

        <label>Mobile</label>

        <input
            type="text"
            name="mobile"
            value="{{ old('mobile', $student->mobile) }}"
            required
        >

        <label>City</label>

        <input
            type="text"
            name="city"
            value="{{ old('city', $student->city) }}"
            required
        >

        <button type="submit">
            Update Student
        </button>

        <a href="{{ route('students.index') }}">
            Back
        </a>

    </form>

</div>

</body>
</html>