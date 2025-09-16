import mongoose from "mongoose";

const weeklySchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true, unique: true },
  subjects: {type: Map, of: [String], default: {}}
});

const WeeklyModel = mongoose.models.weekly || mongoose.model("weekly", weeklySchema);

export default WeeklyModel;