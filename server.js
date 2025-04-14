require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10kb' })); // Limit request body size to 10kb

// Contact form submission route
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error: ', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Contact API is running');
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
      return res.status(413).json({
        success: false,
        error: 'Request body too large. Please keep your message concise.'
      });
    }
    next(err);
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
