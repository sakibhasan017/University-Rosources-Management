import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import express from "express";
import noticeRouter from './routes/noticeRoute.js';
import examRouter from './routes/examRoute.js';
import assignmentRouter from './routes/assignmentRoute.js';
import calendarRouter from './routes/calendarRoute.js';
import notifyRouter from './routes/notifyRoute.js';
import cron from 'node-cron';
import sendScheduledNotifications from './notifyScheduler.js';
import testRoute from './routes/testRoute.js';
import feedbackRouter from './routes/feedbackRoute.js';
import weeklyRouter from './routes/weeklyRoute.js';
import imageRouter from './routes/imageRoute.js';
import profileRouter from './routes/profileRoute.js';
import personnelRouter from './routes/personnelRoute.js';

dotenv.config();
connectDB();

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/notice",noticeRouter);
app.use("/api/exam",examRouter);
app.use("/api/assignment",assignmentRouter);
app.use("/api/calendar",calendarRouter);
app.use("/api/notify",notifyRouter);
app.use("/api/test",testRoute);
app.use("/api/feedback",feedbackRouter);
app.use("/api/weekly",weeklyRouter);
app.use("/api/image",imageRouter);
app.use("/api/profile",profileRouter);
app.use("/api/personnel",personnelRouter);


cron.schedule('0 15 * * *', () => {
  console.log("Running 3.00PM notifier...");
  sendScheduledNotifications();
});

cron.schedule('0 7 * * *', () => {
  console.log("Running 7.0AM notifier...");
  sendScheduledNotifications();
});

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`);
})