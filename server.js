require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error: ', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Contact API is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
