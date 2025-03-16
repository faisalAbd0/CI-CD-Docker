import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Stats from "./models.js"
dotenv.config();


const URI = process.env.MONGO_DB_URL || "mongodb://localhost:27017/student_grades";


const app = express();
const PORT = 3000;
app.use(express.json());
app.set('view engine', 'ejs');
const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
connectDB();


app.get("/", async (req, res) => {
    // reconnect
    try {
        const stats = await Stats.find();

        res.status(200).json({ stats });
        // res.status(200).render("main", { stats });
    } catch (error) {
        res.status(500).send("Error fetching Stats");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
