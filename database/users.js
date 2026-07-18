// This file is for exposing CRUD functions for the User table 
 
const db = require("./database");

// ============================================================================
// CREATE
// ============================================================================

/**
 * Creates a new user
 * 
 * @param {Object} user - Object containing fields to create a new user.
 * @returns none
 */
function createUser(user) {
    db.prepare(`
        INSERT INTO User
        (user_name, password, role)  
        VALUES
        (?,?,?)
    `).run(
        user.userName, 
        user.password, 
        user.role
    );
}

// ============================================================================
// READ
// ============================================================================

/**
 * Retrieves a user by username.
 *
 * Assumes usernames are unique.
 *
 * @param {string} userName - Username to search for.
 * @returns {Object|undefined} Matching user, or undefined if none exists.
 */
function getUserByUsername(name) {
   return db.prepare(`
        SELECT * FROM User
        WHERE user_name = ?
    `).get(name);
}

/**
 * Retrieves a user by ID.
 *
 * @param {number} id - User ID.
 * @returns {Object|undefined} Matching user, or undefined if none exists.
 */
function getUserById(id) {
   return db.prepare(`
        SELECT * FROM User
        WHERE id = ?
    `).get(id);
}

// ============================================================================
// UPDATE
// ============================================================================

/**
 * Updates one or more fields for a user.
 *
 * Example:
 * ```javascript
 * updateUserById(3, {
 *     password: "Password",
 *     role: "Teacher"
 * });
 * ```
 *
 * @param {number} id - User ID.
 * @param {Object} updatesObj - Object containing fields to update.
 * @returns {{changes: number, lastInsertRowid: number|bigint}}
 */
function updateUserById(id, updatesObj) {

    const keys = Object.keys(updatesObj);

    const setClause = keys.map(key => `${key} = ?`).join(", ");

    const sql = `UPDATE User SET ${setClause}WHERE id = ?`;

    const values = keys.map(key => updatesObj[key]);
    values.push(id);

    return db.prepare(sql).run(...values);
}

// ============================================================================
// DELETE
// ============================================================================

/**
 * Deletes a user by ID.
 *
 * @param {number} id - User ID.
 * @returns none
 */
function deleteUserById(id) {
    db.prepare(`
        DELETE FROM User
        WHERE id = ?
    `).run(id);
}

/**
 * Deletes a user by username.
 *
 * @param {string} userName - Username of the user to delete.
 * @returns none
 */
function deleteUserByUserName(name) {
    db.prepare(`
        DELETE FROM User
        WHERE user_name = ?
    `).run(name);
}

// ============================================================================
// MODULE EXPORTS
// ============================================================================

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    updateUserById,
    deleteUserById,
    deleteUserByUserName
};