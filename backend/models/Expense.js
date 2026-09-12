const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: { type: String, enum: ['Plumbing', 'Carpenter', 'Electrical', 'Painting', 'Other'], required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  vendorName: { type: String },
  vendorContact: { type: String },
  invoice: { type: String },
  status: { type: String, enum: ['Pending', 'Completed', 'Paid'], default: 'Completed' },
  flat: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat' },
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);