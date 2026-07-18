// This file exposes CRUD functions for the Enrollment table.

const db = require("./database");

// ============================================================================
// CREATE
// ============================================================================

/**
 * Enrolls a student in a course.
 *
 * @param {number} studentId - ID of the student.
 * @param {number} courseId - ID of the course.
 * @returns {{changes: number, lastInsertRowid: number|bigint}}
 */
function enrollStudent(studentId, courseId) {
    return db.prepare(`
        INSERT INTO Enrollment
        (student_id, course_id)
        VALUES 
        (?, ?)
    `).run(studentId, courseId);
}


// ============================================================================
// READ
// ============================================================================

/**
 * Retrieves every course a student is enrolled in.
 *
 * @param {number} studentId - Student ID.
 * @returns {Object[]} Array of enrolled courses.
 */
function getStudentSchedule(studentId) {
    return db.prepare(`
        SELECT Course.*
        FROM Enrollment
        JOIN Course
            ON Enrollment.course_id = Course.id
        WHERE Enrollment.student_id = ?
        ORDER BY Course.subject_area, Course.number
    `).all(studentId);
}

/**
 * Retrieves every student enrolled in a course.
 *
 * @param {number} courseId - Course ID.
 * @returns {Object[]} Array of enrolled students.
 */
function getStudentsInCourse(courseId) {
    return db.prepare(`
        SELECT User.*
        FROM Enrollment
        JOIN User
            ON Enrollment.student_id = User.id
        WHERE Enrollment.course_id = ?
        ORDER BY User.user_name
    `).all(courseId);
}

/**
 * Determines whether a student is enrolled in a course.
 *
 * @param {number} studentId - Student ID.
 * @param {number} courseId - Course ID.
 * @returns {Object|undefined} Matching enrollment record, if one exists.
 */
function getEnrollment(studentId, courseId) {
    return db.prepare(`
        SELECT *
        FROM Enrollment
        WHERE student_id = ?
          AND course_id = ?
    `).get(studentId, courseId);
}


// ============================================================================
// DELETE
// ============================================================================

/**
 * Removes a student from a course.
 *
 * @param {number} studentId - Student ID.
 * @param {number} courseId - Course ID.
 * @returns {{changes: number, lastInsertRowid: number|bigint}}
 */
function dropStudent(studentId, courseId) {
    return db.prepare(`
        DELETE FROM Enrollment
        WHERE student_id = ?
          AND course_id = ?
    `).run(studentId, courseId);
}


// ============================================================================
// MODULE EXPORTS
// ============================================================================

module.exports = {
    enrollStudent,
    getStudentSchedule,
    getStudentsInCourse,
    getEnrollment,
    dropStudent
};