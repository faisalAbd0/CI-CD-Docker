import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
    maxGrade: { type: Number, required: true },
    minGrade: { type: Number, required: true },
    avgGrade: { type: Number, required: true },
    studentCount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});
export const Stats = mongoose.model('Stats', statsSchema, 'stats');


export async function mongoConnect(mongoUrl) {
    await mongoose.connect(mongoUrl); // Removed deprecated options
    console.log("Connected to MongoDB ✅");
}
export async function mongoDisconnect() {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB ❌");
}