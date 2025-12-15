require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname,'..', 'public')));

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`);
});
