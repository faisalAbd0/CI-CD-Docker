import mysql from 'mysql2/promise';

export const mysqlPool = mysql.createPool({
    host: 'mysql_db',
    user: 'faisal',
    password: 'faisal123',
    database: 'student_grades',
    port: 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

export async function getData() {
    const data = await mysqlPool.query(
        `SELECT 
        MAX(grade) as "Max",
        MIN(grade) as "Min",
        AVG(grade) as "Average",
        COUNT(name) as "Number of students"
        FROM student`
    );
    return data;
}
export async function mysqlConnect() {
    await mysqlPool.getConnection();
    console.log("Connected to MySQL ✅");

}
export async function mysqlDisconnect() {
    await mysqlPool.end();
    console.log("Disconnected from MySQL ❌");
}