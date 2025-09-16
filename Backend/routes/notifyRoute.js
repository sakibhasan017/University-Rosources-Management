import express from 'express'
import { addNotify,fetchNotify } from '../controllers/notifyController.js';
import sendScheduledNotifications from '../notifyScheduler.js';

const notifyRouter = express.Router();

notifyRouter.post('/add',addNotify);
notifyRouter.get('/list',fetchNotify);

notifyRouter.get('/run', async (req, res) => {
  try {
    await sendScheduledNotifications();
    res.json({ success: true, message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ success: false, message: 'Failed to send notifications' });
  }
});

export default notifyRouter;