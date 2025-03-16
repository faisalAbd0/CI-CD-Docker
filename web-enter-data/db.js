import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'mysql_db',
    user: 'faisal',
    password: 'faisal123',
    database: 'student_grades',
    port: 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

async function testConnection() {
    let retries = 5; // Retry a few times in case MySQL isn’t ready
    while (retries > 0) {
        try {
            const connection = await pool.getConnection();
            console.log("Connected to MySQL database successfully ✅✅✅");
            connection.release();
            return pool; // Return the pool once connected
        } catch (err) {
            console.error("MySQL Connection Failed ❌❌❌:", err.message);
            retries--;
            if (retries === 0) {
                throw new Error("Max retries reached. Could not connect to MySQL.");
            }
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retrying
        }
    }
}

// Export the pool only after successful connection
const dbPromise = testConnection();

export default dbPromise;