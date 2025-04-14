const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 254
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  _gotcha: {
    type: String,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
