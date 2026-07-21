const express = require('express');
const router = express.Router();
const { authToken, requireStudent, requireTeacher } = require('../middleware/authentication');
const courseDb = require('../database/courses');

// CRUD method 
// the following is Create...

router.post('/', authToken, requireTeacher, (req, res) => {
    try {
        const { subjectArea, number, name, description, credits, teacherId } = req.body;
        const result = courseDb.createCourse({
            subjectArea,
            number,
            name,
            description,
            credits,
            teacherId
        });
        res.json({ id: result.lastInsertRowid, message: '---COURSE CREATED---' });
    } catch (error) {
        res.status(400).json({ error: error.message }); //400 being bad request
    }
});

// Read (all courses in the database)...
router.get('/', (req, res) => {
    try {
        const courses = courseDb.getAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message }); //500 is internal server error
    }
});

// Read Individually by ID...
router.get('/:id', (req, res) => {
    try {
        const course = courseDb.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ error: '---COURSE NOT FOUND---' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message }); //500 is internal server error
    }
});

// Updating a course...
router.put('/:id', authToken, requireTeacher, (req, res) => {
    try {
        courseDb.updateCourseById(req.params.id, req.body);
        res.json({ message: '---COURSE UPDATED---' });
    } catch (error) {
        res.status(400).json({ error: error.message }); //400 being bad request
    }
});

// Deleting a course...
router.delete('/:id', authToken, requireTeacher, (req, res) => {
    try {
        courseDb.deleteCourseById(req.params.id);
        res.json({ message: '---COURSE REMOVED---' });
    } catch (error) {
        res.status(400).json({ error: error.message }); //400 being bad request
    }
});

module.exports = router;
