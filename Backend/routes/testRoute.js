
import express from 'express';
import sendMail from '../utils/mailer.js';
const router = express.Router();

router.get('/send-test', async (req, res) => {
  try {
    await sendMail('hassansakib513@gmail.com', 'TEST Email', 'This is a plain-text test from ICT8 Vault');
    res.json({ success: true, message: 'Test email sent (queued).' });
  } catch (err) {
    console.error('Test send error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
