const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => { // shows session!
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.status(200).json(req.session.user);
});

router.post('/logout', (req, res) => {
  if (!req.session.user) { // if there is no user session:
    return res.status(401).json({ error: 'Not logged in' }); // return an error message if not logged in
  }
  req.session.destroy(); // delete session token
  res.json({ redirect: "/" }); // redirect user back to homepage to login again
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]); // ROLE GOTTEN UP HERE ^^^^^

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // store session stuff
    req.session.user = { id: rows[0].user_id, username: rows[0].username };
    // redirect here if owner or walker
    if(rows[0].role === "owner") {
      res.json({ redirect: "/owner-dashboard.html" }); // send redirect location back
    } else {
      res.json({ redirect: "/walker-dashboard.html" });
    }
    // res.json({ message: 'Login successful', user: rows[0] }); // remove this
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
