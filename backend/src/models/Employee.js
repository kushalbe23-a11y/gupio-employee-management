const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  department: { type: String, required: true, enum: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'] },
  designation: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  avatarColor: { type: String, default: '#7c3aed' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);