import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import axios from 'axios';
const app = express();
const PORT = 8080;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Serve the form at the root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Enter Data service! Use POST /submit to add a student.' });
});


// Handle form submission
app.post("/submit", async (req, res) => {
    const { name, grade } = req.body;
    console.log(`Student Name: ${name}, Grade: ${grade}`);

    try {
        const pool = await db; // Wait for the pool to be ready
        const [result] = await pool.query(
            "INSERT INTO student (name, grade) VALUES (?, ?)",
            [name, grade]
        );
        await axios.get('http://analysis:5000/trigger');
        res.status(201).json({ 'message': "Done", 'name': name, 'grade': grade })
        // res.status(201).send(`Student added successfully: ${name}, Grade: ${grade}`);
    } catch (err) {
        console.error("Error adding student:", err.message);
        res.status(500).send("Error adding student to database");
    }
});

// Start the server only after DB connection is confirmed
db.then((pool) => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});