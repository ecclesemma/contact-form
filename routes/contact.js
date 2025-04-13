const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, _gotcha } = req.body;

    // Honeypot check (spam detection)
    if (_gotcha) {
      return res.status(400).json({ success: false, error: 'Spam detected' });
    }

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Create and save submission
    const submission = new Submission({ name, email, phone, message, _gotcha });
    await submission.save();

    res.status(201).json({ success: true, message: 'Message received!' });

  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
