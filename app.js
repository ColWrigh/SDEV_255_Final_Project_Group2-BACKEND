const enrollmentDb = require("./database/enrollment");
const courseDb = require("./database/courses");
const userDb = require("./database/users");
const express = require('express');
const app = express();
const port = 3000;


require('./database/schema');
require('./database/seed');                 // Only runs if the database is not already established on your system

app.get('/', (req, res) => {
    res.send('Hello World');
});

console.log(courseDb.getAllCourses());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});