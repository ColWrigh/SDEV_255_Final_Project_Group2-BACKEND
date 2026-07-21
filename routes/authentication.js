const express = require('express'); //requires the JS Express module to be used
const router = express.Router(); //router to handle requests 

const { authToken, requireStudent, requireTeacher } = require('../middleware/authentication'); //this imports the three functions from /middleware/authentication.js

// this route is for teachers ONLY
router.get("/teacherPanel", verifyToken, requireTeacher, (req, res) => {
    res.json({ message: "Welcome, teacher!" });
    //next();
});

// this route is for students ONLY
router.get("/studentPanel", verifyToken, requireStudent, (req, res) => {
    res.json({ message: "Welcome, student!" });
    //next();
});

// and finally this route is for any authenticated user
router.get("/profile", verifyToken, (req, res) => {
    res.json({ user: req.user });
    //next();  commented out because I don't *believe* we need this, but unsure in practice
});

module.exports = router;
