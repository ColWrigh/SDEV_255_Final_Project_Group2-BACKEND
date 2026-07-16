/* 
* The purpose of this file is to open the database.
* If the database does exist, it is opened.
* If the database doesn't exist, it is created.
*/

const Database = require("better-sqlite3");

const db = new Database("./database/college.db");

module.exports = db;