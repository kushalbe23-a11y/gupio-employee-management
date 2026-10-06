const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: { title: 'Gupio Employee Management API', version: '1.0.0' },
    servers: [{ url: '/api' }],
    paths: {
      '/health': { get: { summary: 'API and database health' } },
      '/employees': {
        get: { summary: 'List employees', parameters: [{name:'search',in:'query'},{name:'department',in:'query'},{name:'page',in:'query'},{name:'limit',in:'query'}] },
        post: { summary: 'Create employee' }
      },
      '/employees/{id}': {
        get: { summary: 'Get employee' },
        put: { summary: 'Update employee' },
        delete: { summary: 'Delete employee' }
      }
    }
  });
});
module.exports = router;