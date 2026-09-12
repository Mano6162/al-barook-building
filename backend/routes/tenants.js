const express = require('express');
const Tenant = require('../models/Tenant');
const router = express.Router();

// Get all tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('flat');
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create tenant
router.post('/', async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update tenant
router.put('/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('flat');
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;