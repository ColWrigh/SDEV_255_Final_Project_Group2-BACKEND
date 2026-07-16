const express = require('express');
const app = express();
const port = 3000;

require('./database/schema');
require('./database/seed');         // Only runs if the database is not already established on your system

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});