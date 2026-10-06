require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const employeeRoutes = require('./routes/employeeRoutes');
const docsRoutes = require('./routes/docs');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(s => s.trim());

app.use(cors({ origin: (origin, cb) => !origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error('CORS origin not allowed')) }));
app.use(express.json({ limit: '100kb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));

app.get('/', (req, res) => res.json({ service: 'Gupio Employee Management API', status: 'healthy', version: '1.0.0' }));
app.get('/api/health', async (req, res) => res.json({ success: true, api: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/docs', docsRoutes);
app.use('/api/employees', employeeRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found.' }));
app.use(errorHandler);

async function start() {
  if (!process.env.MONGODB_URI) { console.error('MONGODB_URI is missing. Copy .env.example to .env and configure MongoDB Atlas.'); process.exit(1); }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
  app.listen(PORT, '0.0.0.0', () => console.log(`API running on port ${PORT}`));
}
start().catch(err => { console.error('Startup failed:', err.message); process.exit(1); });