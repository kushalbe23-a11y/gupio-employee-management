const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'];

router.get('/meta', (req, res) => res.json({ success: true, departments }));

router.get('/', async (req, res, next) => {
  try {
    const { search = '', department = 'All', page = 1, limit = 8 } = req.query;
    const filter = {};
    if (search.trim()) filter.$or = [{ name: { $regex: search.trim(), $options: 'i' } }, { email: { $regex: search.trim(), $options: 'i' } }];
    if (department !== 'All') filter.department = department;
    const safeLimit = Math.min(Math.max(Number(limit) || 8, 1), 50);
    const safePage = Math.max(Number(page) || 1, 1);
    const [items, total] = await Promise.all([
      Employee.find(filter).sort({ createdAt: -1 }).skip((safePage - 1) * safeLimit).limit(safeLimit),
      Employee.countDocuments(filter)
    ]);
    res.json({ success: true, data: items, pagination: { page: safePage, limit: safeLimit, total, pages: Math.max(Math.ceil(total / safeLimit), 1) } });
  } catch (e) { next(e); }
});

router.get('/stats', async (req, res, next) => {
  try {
    const [total, departmentsAgg] = await Promise.all([
      Employee.countDocuments(),
      Employee.aggregate([{ $group: { _id: '$department', count: { $sum: 1 } } }, { $sort: { count: -1 } }])
    ]);
    res.json({ success: true, data: { total, departments: departmentsAgg } });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Employee.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Employee not found.' });
    res.json({ success: true, data: item });
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, department, designation } = req.body;
    if (!name || !email || !department || !designation) return res.status(400).json({ success: false, message: 'Name, email, department and designation are required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    const employee = await Employee.create({ name, email, department, designation });
    res.status(201).json({ success: true, message: 'Employee created successfully.', data: employee });
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, department, designation } = req.body;
    if (!name || !email || !department || !designation) return res.status(400).json({ success: false, message: 'All employee fields are required.' });
    const employee = await Employee.findByIdAndUpdate(req.params.id, { name, email, department, designation }, { new: true, runValidators: true });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found.' });
    res.json({ success: true, message: 'Employee updated successfully.', data: employee });
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found.' });
    res.json({ success: true, message: 'Employee deleted successfully.' });
  } catch (e) { next(e); }
});

module.exports = router;