const express = require('express');
const RentRecord = require('../models/RentRecord');
const Tenant = require('../models/Tenant');
const router = express.Router();

// Get pending reminders
router.get('/pending', async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const records = await RentRecord.find({ month: currentMonth, status: 'Pending', reminderSent: false }).populate('flat tenant');
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send reminders
router.post('/send-all', async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const records = await RentRecord.find({ month: currentMonth, status: 'Pending', reminderSent: false }).populate('flat tenant');
    
    // Here you would integrate with email service (Nodemailer, SendGrid, etc.)
    // For now, just marking as sent
    await RentRecord.updateMany(
      { month: currentMonth, status: 'Pending', reminderSent: false },
      { reminderSent: true }
    );
    
    res.json({ message: `${records.length} reminders sent`, count: records.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;