import mongoose from "mongoose";
const { Schema, model } = mongoose;



const statsSchema = new Schema({
    maxGrade: { type: Number, required: true },
    minGrade: { type: Number, required: true },
    avgGrade: { type: Number, required: true },
    studentCount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Stats = model('Stats', statsSchema, 'stats');
export default Stats;
