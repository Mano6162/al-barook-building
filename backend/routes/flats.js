const express = require('express');
const Flat = require('../models/Flat');
const router = express.Router();

// Get all flats
router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find().populate('tenant');
    res.json(flats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get flat by ID
router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id).populate('tenant');
    if (!flat) return res.status(404).json({ error: 'Flat not found' });
    res.json(flat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create flat
router.post('/', async (req, res) => {
  try {
    const flat = new Flat(req.body);
    await flat.save();
    res.status(201).json(flat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update flat
router.put('/:id', async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tenant');
    if (!flat) return res.status(404).json({ error: 'Flat not found' });
    res.json(flat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete flat
router.delete('/:id', async (req, res) => {
  try {
    const flat = await Flat.findByIdAndDelete(req.params.id);
    if (!flat) return res.status(404).json({ error: 'Flat not found' });
    res.json({ message: 'Flat deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;