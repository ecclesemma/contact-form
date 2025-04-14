const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const contactLimiter = require('../middleware/rate_limit');
const validator = require('validator');


// POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
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

    // sanitization and validation
    const sanitizedName = validator.escape(name.trim());
    const sanitizedEmail = validator.normalizeEmail(email.trim());
    const sanitizedPhone = phone ? validator.escape(phone.trim()) : null;
    const sanitizedMessage = validator.escape(message.trim());

    if (!validator.isEmail(sanitizedEmail)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }
    const submission = new Submission({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage,
    });
    await submission.save();
    res.status(201).json({ success: true, message: 'Message received!' });

  } catch (err) {
    console.error('Error saving submission:', err);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: err.errors
        });
      }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
