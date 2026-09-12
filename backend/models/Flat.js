const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  flatNumber: { type: String, required: true, unique: true },
  floor: { type: Number, required: true, min: 1, max: 7 },
  type: { type: String, enum: ['Fully Furnished', 'Semi-Furnished'], required: true },
  status: { type: String, enum: ['Occupied', 'Vacant', 'Maintenance'], default: 'Vacant' },
  monthlyRent: { type: Number, required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  parking: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flat', flatSchema);