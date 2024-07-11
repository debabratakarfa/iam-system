// routes/healthRoutes.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'pong' });
});

router.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.status(200).json({
      status: 'ok',
      details: {
        database: dbStatus,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      details: {
        error: error.message,
        timestamp: new Date().toISOString()
      }
    });
  }
});

module.exports = router;
