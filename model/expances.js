const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  item: { type: String,  },
  friends: { type: [String], required: true }
}, { timestamps: true }); // Add timestamps here

module.exports = mongoose.model('Expense', expenseSchema);
