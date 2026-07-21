const express = require('express'); //requires the JS Express module to be used
const router = express.Router(); //router to handle requests 
const bcrypt = require('bcryptjs'); //password hashing module
const jwt = require('jsonwebtoken'); //requiring json webtoken, for authentication
const userDb = require('../database/users'); //the users database 
const { authToken, requireStudent, requireTeacher } = require('../middleware/authentication'); //this imports the three functions from /middleware/authentication.js

//this is for logging in and assigning a token to the user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = userDb.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "---INVALID USERNAME OR PASSWORD---" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "---INVALID CREDENTIALS---" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h'}
    );
    res.json({ token, message: '---LOGIN SUCCESSFUL---' });
})

// this route is for teachers ONLY
router.get("/teacherPanel", authToken, requireTeacher, (req, res) => {
    res.json({ message: "Welcome, teacher!" });
    //next();
});

// this route is for students ONLY
router.get("/studentPanel", authToken, requireStudent, (req, res) => {
    res.json({ message: "Welcome, student!" });
    //next();
});

// and finally this route is for any authenticated user
router.get("/profile", authToken, (req, res) => {
    res.json({ user: req.user });
    //next();  commented out because I don't *believe* we need this, but unsure in practice
});

module.exports = router;
