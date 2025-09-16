import WeeklyModel from "../models/weeklyModel.js";

const addWeek = async (req, res) => {
  try {
    const week = new WeeklyModel({
      weekNumber: req.body.weekNumber,
      subjects: req.body.subjects || {}
    });
    
    await week.save();
    res.json({ success: true, message: "Week Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Adding Week" });
  }
};

const fetchWeeks = async (req, res) => {
  try {
    const weeks = await WeeklyModel.find().sort({ weekNumber: 1 });
    res.json({ success: true, message: weeks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Fetching Weeks" });
  }
};

const addSubject = async (req, res) => {
  try {
    const week = await WeeklyModel.findById(req.params.id);
    if (!week) {
      return res.json({ success: false, message: "Week not found" });
    }

    const { subjectName } = req.body;
    week.subjects.set(subjectName, []);
    await week.save();
    
    res.json({ success: true, message: "Subject Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Adding Subject" });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const week = await WeeklyModel.findById(req.params.id);
    if (!week) {
      return res.json({ success: false, message: "Week not found" });
    }
    const { subjectName } = req.body;
    week.subjects.delete(subjectName);
    await week.save();
    res.json({ success: true, message: "Subject Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Deleting Subject" });
  }
};

const updateSubject = async (req, res) => {
  try {
    const week = await WeeklyModel.findById(req.params.id);
    if (!week) {
      return res.json({ success: false, message: "Week not found" });
    }
    const { subjectName, tasks } = req.body;
    week.subjects.set(subjectName, tasks);
    await week.save();
    res.json({ success: true, message: "Subject Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Updating Subject" });
  }
};

const deleteWeek = async (req, res) => {
  try {
    await WeeklyModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Week Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Deleting Week" });
  }
};

export {addWeek,fetchWeeks,addSubject,deleteSubject,updateSubject,deleteWeek};