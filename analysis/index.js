import express from "express";
import { syncData } from "./analytics.js";
const app = express();
const PORT = 5000;
app.use(express.json());
// MongoDB Schema for Statistics
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/trigger", async (req, res) => {
    try {
        await syncData();
        res.send("Analysis started successfully!");
    } catch (error) {
        console.error("Analysis error:", error);
        res.status(500).send("Analysis failed!");
    }
});    