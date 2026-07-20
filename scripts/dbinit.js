const db = require('./database'); //Requiring the already existing database.js file. Establishes connection.

db.exec(`
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('student', 'teacher')) NOT NULL
    );
`);

//backticks above allowing many multi-line strings to be used at once 

console.log('Database initialized.');