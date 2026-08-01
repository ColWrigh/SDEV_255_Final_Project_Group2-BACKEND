# SDEV 255 Final Project Backend

This repository contains the backend for a course management system built with Node.js, Express, and SQLite. It provides user authentication, role-based authorization for students and teachers, and CRUD operations for course records.

## Features

- JSON Web Token (JWT) authentication
- Role-based access control for `student` and `teacher`
- Course creation, retrieval, update, and deletion
- SQLite database with schema creation and initial course seed data
- CORS support for frontend integration

## Project Structure

- `app.js` - main application entry point
- `routes/` - Express route handlers
  - `authentication.js` - login, profile, student/teacher panels
  - `courses.js` - course CRUD endpoints
- `database/` - SQLite database integration and data access
  - `database.js` - opens the SQLite database file
  - `schema.js` - creates tables if they do not exist
  - `seed.js` - inserts starter data when database is empty
  - `users.js` - user CRUD helpers
  - `courses.js` - course CRUD helpers
- `middleware/` - Express authentication middleware
  - `authentication.js`

## Prerequisites

- Node.js 18+ recommended
- npm

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd SDEV_255_Final_Project_Group2-BACKEND
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with a JWT secret:

```env
JWT_SECRET=your-secret-key
```

## Running the Server

Start the application:

```bash
node app.js
```

The server listens on:

```text
http://localhost:3000
```

> The database file is stored at `database/college.db`. `schema.js` creates tables on startup and `seed.js` inserts initial data only when the database is empty.

## API Endpoints

### Authentication

- `POST /auth/login`
  - Body: `{ "username": "teacher1", "password": "password0" }`
  - Returns: `{ token, message }`

- `GET /auth/profile`
  - Requires `Authorization: Bearer <token>`
  - Returns the decoded user payload

- `GET /auth/studentPanel`
  - Requires student role
  - Returns a welcome message for students

- `GET /auth/teacherPanel`
  - Requires teacher role
  - Returns a welcome message for teachers

### Courses

- `GET /courses`
  - Returns all courses

- `GET /courses/:id`
  - Returns a specific course by ID

- `POST /courses`
  - Requires teacher role
  - Body example:

```json
{
  "subjectArea": "CS",
  "number": 202,
  "name": "Data Structures",
  "description": "Study of algorithms and data organization.",
  "credits": 4,
  "teacherId": 1
}
```

- `PUT /courses/:id`
  - Requires teacher role
  - Update one or more fields for a course

- `DELETE /courses/:id`
  - Requires teacher role
  - Deletes a course by ID

## Seed Data

On first startup, seed data includes:

- Users:
  - `teacher1` / `password0` / `teacher`
  - `student1` / `password1` / `student`
- Courses:
  - CS 101: Introduction to Programming
  - MATH 210: Discrete Structures
  - ENG 150: Technical Writing
  - HIST 220: History of Technology
  - BIO 101: General Biology

## Notes

- Passwords are stored and checked in plaintext in this version for ease of demonstration. For production code, use hashed passwords and secure password comparisons.
- The authentication middleware expects a bearer token in the `Authorization` header.

## Dependencies

- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `better-sqlite3`
- `bcryptjs`

## License

This project does not include a license file. Add one if you wish to define reuse permissions.
