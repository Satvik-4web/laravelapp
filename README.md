# Student Management System

## Project Overview

This is a Laravel REST API + Next.js frontend student management system featuring Sanctum-based token authentication, Role-Based Access Control (RBAC), and user profile management (including change password screens).

## Tech Stack

- **Backend**: Laravel 13, PHP 8.4, SQLite (for database storage)
- **Frontend**: Next.js 16.3, React 19, TypeScript, Tailwind CSS
- **Authentication**: Laravel Sanctum (Bearer Token)
- **APIs**: REST API
- **Testing**: Postman

## Requirements

- PHP >= 8.3
- Composer
- Node.js >= 18
- npm

---

## Backend Setup

1. **Navigate to backend and install dependencies**:
   ```bash
   composer install
   ```

2. **Configure Environment File**:
   Copy `.env.example` to `.env` and verify database configuration. By default, the application is pre-configured to use SQLite:
   ```bash
   cp .env.example .env
   ```

3. **Generate Application Key**:
   ```bash
   php artisan key:generate
   ```

4. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

5. **Seed Roles and Default Users**:
   Seeds default users for all roles with default password `password`:
   ```bash
   php artisan db:seed
   ```

6. **Start Laravel Development Server**:
   ```bash
   php artisan serve
   ```
   The API will run at `http://127.0.0.1:8000`.

---

## Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node modules**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `frontend/.env.local` file pointing to the Laravel API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   ```

4. **Start Frontend Development Server**:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`.

---

## Authentication & Authorization

The system implements Sanctum token-based authentication. Users present Bearer tokens in request headers to access protected endpoints.

### Supported Roles

- **Admin**: Full access. Can access all dashboards, Student CRUD, and user management.
- **Principal**: Can access Principal Dashboard, institution statistics, and view/read Student access.
- **HOD**: Can access HOD Dashboard, department metrics, and view/read Student access.
- **Faculty**: Can access Faculty Dashboard, assigned classes lists, and view Student profiles.
- **Student**: Access only to the Student Dashboard (enrolled courses, profile). Restrained from accessing administrative/faculty dashboards or Student CRUD APIs.

### Role-Based Routing

After a successful login, the frontend routes the user to their designated dashboard:
- Admin -> `/admin/dashboard`
- Principal -> `/principal/dashboard`
- HOD -> `/hod/dashboard`
- Faculty -> `/faculty/dashboard`
- Student -> `/student/dashboard`

---

## Protected APIs & Endpoints

| Method | Endpoint | Description | Middleware |
|---|---|---|---|
| POST | `/api/register` | Register a new user | Public |
| POST | `/api/login` | Log in and receive a Bearer token | Public |
| POST | `/api/logout` | Log out and revoke active tokens | `auth:sanctum` |
| GET | `/api/me` | Return active logged-in user object | `auth:sanctum` |
| GET | `/api/user` | Return active logged-in user object (legacy) | `auth:sanctum` |
| POST | `/api/change-password` | Update user password | `auth:sanctum` |
| GET | `/api/students` | Get all students | `auth:sanctum` |
| POST | `/api/students` | Create new student | `auth:sanctum` |
| GET | `/api/students/{id}` | Retrieve details of a student | `auth:sanctum` |
| PUT | `/api/students/{id}` | Update student details | `auth:sanctum` |
| DELETE | `/api/students/{id}` | Delete a student | `auth:sanctum` |
| GET | `/api/admin/dashboard` | Admin dashboard data | `auth:sanctum`, `role:Admin` |
| GET | `/api/principal/dashboard` | Principal dashboard data | `auth:sanctum`, `role:Principal,Admin` |
| GET | `/api/hod/dashboard` | HOD dashboard data | `auth:sanctum`, `role:HOD,Admin` |
| GET | `/api/faculty/dashboard` | Faculty dashboard data | `auth:sanctum`, `role:Faculty,Admin` |
| GET | `/api/student/dashboard` | Student dashboard data | `auth:sanctum`, `role:Student,Admin` |

---

## Bonus Features

1. **Change Password Screen**:
   - Secure Change Password interface at `/change-password` path.
   - Validates that current password matches, matches confirmation, and validates minimum password length rules.
   - Force revokes active tokens upon success, requesting the user to log back in.
2. **Role-Based Dashboards**:
   - Dynamic, customized pages at `/admin/dashboard`, `/principal/dashboard`, `/hod/dashboard`, `/faculty/dashboard`, and `/student/dashboard`.
   - Backend-verified middleware ensures no user can spoof access.

---

## Postman API Collection

A complete Postman collection is stored at:
`postman/collections/Student_Management_API.postman_collection.json`

### Import and Use:
1. Open Postman.
2. Click **Import** and select the `.json` file.
3. Configure the collection variables or environment:
   - `base_url` = `http://127.0.0.1:8000/api`
4. Log in using one of the seeded accounts (e.g. `admin@example.com` / `password`). The login request runs a test script that sets the global `token` variable automatically.
5. All subsequent requests in the collection automatically consume the `{{token}}` variable for header authentication.

---

## Security

**CRITICAL GUIDELINES**:
- Never commit real passwords, API tokens, database credentials, or `.env` secrets.
- Always utilize `frontend/.env.local` environment variable mappings for frontend URLs.
- Always clear local storage tokens on token expiration or logout.

---

## Git Branch

All authentication, RBAC, change password, and dashboards implementation resides on the branch:
`feature/authentication`
