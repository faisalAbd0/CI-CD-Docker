import { Stats ,  mongoConnect , mongoDisconnect} from './mongo.js';
import {getData ,mysqlConnect,mysqlDisconnect } from './mysql.js';

async function mySqlFetch(){
    await mysqlConnect();
    const [rows] = await getData();
    console.log("Fetched stats from MySQL:", rows[0]);  
    if (!rows || rows.length === 0 || rows[0].Max === null) {
        console.log("No student data found in MySQL");
        return;
    }

    // Extract stats and convert strings to numbers
    const { Max: maxGrade, Min: minGrade, Average: avgGrade, "Number of students": studentCount } = rows[0];
    const maxGradeNum = Number(maxGrade);
    const minGradeNum = Number(minGrade);
    const avgGradeNum = Number(avgGrade);
    const studentCountNum = Number(studentCount);
    return {maxGradeNum, minGradeNum , avgGradeNum, studentCount};

}

async function mongoUpdate(maxGradeNum, minGradeNum , avgGradeNum, studentCount) {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo_db:27017/student_grades';
        mongoConnect(mongoUrl);
    
        // Store stats in MongoDB
        await Stats.updateOne(
            {}, // Overwrite the single stats document
            {
                maxGrade: maxGradeNum,
                minGrade: minGradeNum,
                avgGrade: Number(avgGradeNum.toFixed(2)), // Convert to number and round
                studentCount,
                timestamp: new Date()
            },
            { upsert: true } // Insert if not exists
        );
        console.log("Stats synced to MongoDB successfully");

        console.log("Connections closed");
}

export async function syncData() {
    try {
        // Connect to MySQL
    
        const data = await mySqlFetch();
        mongoUpdate(data.maxGradeNum, data.minGradeNum, data.avgGradeNum, data.studentCount);
        
    } catch (err) {
        console.error("Error syncing data:", err.message);
        process.exit(1);
    }
}

