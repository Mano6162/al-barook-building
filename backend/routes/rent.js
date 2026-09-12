const express = require('express');
const RentRecord = require('../models/RentRecord');
const router = express.Router();

// Get all rent records
router.get('/', async (req, res) => {
  try {
    const records = await RentRecord.find().populate('flat tenant');
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get rent record by month
router.get('/month/:month', async (req, res) => {
  try {
    const records = await RentRecord.find({ month: req.params.month }).populate('flat tenant');
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create rent record
router.post('/', async (req, res) => {
  try {
    const record = new RentRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update rent record
router.put('/:id', async (req, res) => {
  try {
    const record = await RentRecord.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('flat tenant');
    if (!record) return res.status(404).json({ error: 'Rent record not found' });
    res.json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;