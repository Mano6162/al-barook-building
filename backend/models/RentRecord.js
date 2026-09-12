const mongoose = require('mongoose');

const rentRecordSchema = new mongoose.Schema({
  flat: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  month: { type: String, required: true },
  expectedRent: { type: Number, required: true },
  amountReceived: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending', 'Partial', 'Paid'], default: 'Pending' },
  dateReceived: { type: Date },
  paymentMethod: { type: String, enum: ['Cash', 'Bank Transfer', 'Check', 'Online'], default: 'Cash' },
  notes: { type: String },
  dueDate: { type: Date },
  reminderSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RentRecord', rentRecordSchema);