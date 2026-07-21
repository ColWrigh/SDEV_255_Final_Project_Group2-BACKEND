require('dotenv').config(); //requiring dotenv to be used for variables in the .env file

// database constants
const enrollmentDb = require("./database/enrollment");
const courseDb = require("./database/courses");
const userDb = require("./database/users");

// routes constants
const authRoutes = require('./routes/authentication');
const courseRoutes = require('./routes/courses');

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors()); //allows requests from front-end to back, and back to front.
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

require('./database/schema');
require('./database/seed');                 // Only runs if the database is not already established on your system

app.get('/', (req, res) => {
    res.send('Hello World');
});

console.log(courseDb.getAllCourses());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});