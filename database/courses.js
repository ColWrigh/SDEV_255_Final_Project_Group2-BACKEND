// This file exposes CRUD functions for the Course table 

const db = require("./database")

// ============================================================================
// CREATE
// ============================================================================

/**
 * Creates a new course.
 *
 * @param {Object} course - Object containing fields to create a course.
 * @returns none
 */
function createCourse(course) {
    return db.prepare(`
        INSERT INTO Course
        (subject_area, number, name, description, credits, teacher_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        course.subjectArea, 
        course.number, 
        course.name, 
        course.description, 
        course.credits, 
        course.teacherId
    );
}

// ============================================================================
// READ
// ============================================================================

/**
 * Retrieves every course in the database.
 *
 * @returns {Object[]} Array of Course records.
 */
function getAllCourses() {
    return db.prepare(`
        SELECT *
        FROM Course
    `).all();
}

/**
 * Retrieves a course by its ID.
 *
 * @param {number} id - Course ID.
 * @returns {Object|undefined} Matching course, or undefined if none exists.
 */
function getCourseById(id) {
   return db.prepare(`
        SELECT * FROM Course
        WHERE id = ?
    `).get(id);
}

/**
 * Retrieves a course by its name.
 *
 * @param {string} course - Exact course name.
 * @returns {Object|undefined} Matching course, or undefined if none exists.
 */
function searchCourseByName(course) {
    return db.prepare(`
        SELECT *
        FROM Course
        WHERE name = ?
    `).get(course);
}


// ============================================================================
// UPDATE
// ============================================================================

/**
 * Updates one or more fields for a course.
 *
 * Example:
 * ```javascript
 * updateCourseById(5, {
 *     name: "Integrated Chemistry and Physics",
 *     credits: 4
 * });
 * ```
 *
 * @param {number} id - Course ID.
 * @param {Object} updatesObj - Object containing fields to update.
 * @returns {{changes: number, lastInsertRowid: number|bigint}}
 */
function updateCourseById(id, updatesObj) {

    // Get keys from updateObj 
    keys = Object.keys(updatesObj);                                 

    // Extract keys into an SQL format
    const setClause = keys.map(key => `${key} = ?`).join(', ');     

    // Apply setClause to SQL statement
    const sql = `UPDATE Course SET ${setClause} WHERE id = ?`;        

    const values = keys.map(key => updatesObj[key]);                  // Gather values in same order as keys
    values.push(id);                                                  // append id at the end for WHERE clause

    const stmt = db.prepare(sql);                                     // Prepare queary
    const result = stmt.run(...values);                               // Run and store the result
    
    return result;
}


// ============================================================================
// DELETE
// ============================================================================

/**
 * Deletes a course by its ID.
 *
 * @param {number} id - Course ID.
 * @returns none
 */
function deleteCourseById(id) {
    db.prepare(`
        DELETE FROM Course
        WHERE id = ?
    `).run(id);
}

// ============================================================================
// MODULE EXPORTS
// ============================================================================

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    searchCourseByName,
    updateCourseById,
    deleteCourseById
};