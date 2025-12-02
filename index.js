require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require('./server/routes/user');
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
