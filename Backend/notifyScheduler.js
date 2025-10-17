import axios from 'axios';
import notifyModel from './models/notifyModel.js';
import sendMail from './utils/mailer.js';
import moment from 'moment-timezone';

const sendScheduledNotifications = async () => {
  try {
    const response = await axios.get(`${process.env.VITE_API_BASE_URL}/api/calendar/list`);
    const calendarData = response.data.message;

    const now = moment().tz('Asia/Dhaka');
    const hour = now.hour();
    const minute = now.minute();
    const today = now.format('YYYY-MM-DD');
    const tomorrow = now.clone().add(1, 'day').format('YYYY-MM-DD');

    const users = await notifyModel.find();

    calendarData.forEach(item => {
      const deadline = moment(item.date, ["MM/DD/YYYY", "YYYY-MM-DD"])
    .tz("Asia/Dhaka")
    .format("YYYY-MM-DD");
      const title = item.title;
      const eventSection = item.section; 

      if (
        (deadline === tomorrow && (hour===15 && minute === 0)) ||
        (deadline === today && (hour === 7 && minute === 0))
      ) {
        users.forEach(user => {
          
          if (eventSection === "All" || eventSection === user.section) {
            const subject = `📢 Upcoming ${title} Reminder`;
            const html = `<p>Hello ${user.name},<br><br>This is a reminder that your <strong>${title}</strong> is due ${deadline === today ? 'today' : 'tomorrow'}.<br>Make sure to check website for details!<br><br>Best wishes,<br>ICT8 Vault</p>`;

            sendMail(user.email, subject, html);
          }
        });
      }
    });
  } catch (err) {
    console.error("Scheduler Error:", err.message);
  }
};

export default sendScheduledNotifications;
