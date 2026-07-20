const jwt = require('jsonwebtoken'); //this requires the jsonwebtoken to be used



function authToken(req, res, next) {
    const authHeader = req.headers.authorization; //retrieves the authorization header from the request
    if (!authHeader || !authHeader.startsWith("Bearer ")) { //the space is required after Bearer
        return res.status(401).json({ message: "---AUTH TOKEN INVALID OR NOT PRESENT---" });
        const token = authHeader.slice(7); //7 includes "Bearer" and the space, which is removed to get the token itself
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifies the token by using the secret key from the .env file
            req.user = decoded; 
            next(); //if token is verified, this hands off the request
        } catch (err) {
            return res.status(401).json({ message: "---AUTH TOKEN INVALID OR NOT PRESENT---" }); //error if the token is invalid or missing
        }
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