const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

const apiRouter = require('./routes/api');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

app.use('/api', apiRouter);

// Export the app instead of listening here
module.exports = app;
