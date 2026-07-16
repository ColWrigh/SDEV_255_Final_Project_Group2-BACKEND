// This file is to insert starter data ONCE on a fresh database instance 
    const db = require("./database");


    console.log("Checking for initial User data...");

    const userData = db.prepare(
        "SELECT COUNT(*) AS count FROM User"
    ).get();

    if (userData.count === 0) {    // If database is empty, insert data

        console.log("No User data found, inserting data...")

        db.prepare(`
            INSERT INTO User 
            (user_name,password,role)
            VALUES
            ('teacher1','password0','teacher'),
            ('student1','password1','student')
        `).run();

    }


    console.log("Checking for Course data...");
    
    const courseData = db.prepare(
        "SELECT COUNT(*) AS count FROM Course"
    ).get();


    if (courseData.count === 0) {

        console.log("No Course data found, inserting courses");

        db.prepare(`
            INSERT INTO Course
            (subject_area,number, name,description, credits,teacher_id)
            VALUES
            ('CS','101','Introduction to Programming','Foundations of computational thinking and software construction using a modern high-level language. Covers variables, control flow, functions, and basic data structures.',3,1),
            ('MATH','210','Discrete Structures','Logic, sets, relations, graph theory, and combinatorics as applied to computing problems. Required prerequisite for upper-level CS coursework.',4,1),
            ('ENG','150','Technical Writing','Practice in writing clear technical documentation, proposals, and reports for audiences in engineering and applied science fields.',3,1),
            ('HIST','220','History of Technology','A survey of how technological change has shaped, and been shaped by, society from the industrial revolution to the information age.',3,1),
            ('BIO','101','General Biology','An introduction to cellular biology, genetics, and evolution, with a weekly laboratory component.',4,1)
        `).run();
    }