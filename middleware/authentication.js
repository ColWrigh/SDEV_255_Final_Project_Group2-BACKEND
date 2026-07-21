const jwt = require('jsonwebtoken'); //this requires the jsonwebtoken to be used



function authToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "---AUTH TOKEN INVALID OR NOT PRESENT---" });
    }
    const token = authHeader.slice(7);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "---AUTH TOKEN INVALID OR NOT PRESENT---" });
    }
}

// if the user does not possess a Student role for a route they are accessing, they will be denied with an error message

function requireStudent(req, res, next) {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "---STUDENT ACCESS REQUIRED TO REACH THIS RESOURCE---" });
    }
    next();
}

//same as above except for Teacher role. 

function requireTeacher(req, res, next) {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "---TEACHER ACCESS REQUIRED TO REACH THIS RESOURCE---" });
    }
    next();
}

module.exports = {
    authToken,
    requireStudent,
    requireTeacher,
}
