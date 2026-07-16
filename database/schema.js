// The purpose of this file is to create a table, only if it does not exist 
const db = require("./database");

// User - [id (pk, autoincrement), user_name, password, role (student or teacher)]
db.prepare(`        
    CREATE TABLE IF NOT EXISTS User(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT UNIQUE NOT NULL,         
    password TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL
    )
`).run();

// Course - [id (pk, autoincrement), subject_area, number, name, description, credits, teacher_id]
db.prepare(`
    CREATE TABLE IF NOT EXISTS Course(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_area TEXT,
    number INTEGER,
    name TEXT,
    description TEXT,
    credits INTEGER,
    teacher_id INTEGER
    )    
`).run();

// Enrollment - [student_id, course_id]
db.prepare(`
    CREATE TABLE IF NOT EXISTS Enrollment(
    student_id INTEGER,
    course_id INTEGER
    )
`).run();