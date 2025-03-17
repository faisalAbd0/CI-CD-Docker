import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import axios from 'axios';
const app = express();
const PORT = 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Testing building and pushing using the github action and CI/CD pipeline.' });
});



app.post("/submit", async (req, res) => {
    const { name, grade } = req.body;
    console.log(`Student Name: ${name}, Grade: ${grade}`);

    try {
        const pool = await db; 
        const [result] = await pool.query(
            "INSERT INTO student (name, grade) VALUES (?, ?)",
            [name, grade]
        );
        await axios.get('http://analysis:5000/trigger');
        res.status(201).json({ 'message': "Done", 'name': name, 'grade': grade })
    
    } catch (err) {
        console.error("Error adding student:", err.message);
        res.status(500).send("Error adding student to database");
    }
});


db.then((pool) => {
    app.listen(PORT, () => {
        console.log(`Server is running 123132 on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});