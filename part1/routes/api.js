var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/dogs', async(req, res) => {
  const [rows] = await db.query(`
    SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
  res.json(rows);
});

router.get('/walkrequests/open', async(req, res) => {
  const [rows] = await db.query(`
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time,
    WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_name
    FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
    JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open'`);
  res.json(rows);
});

router.get('/walkers/summary', async(req, res) => {
  const [rows] = await db.query(`
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username
    FROM WalkRequests INNER JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE User.role = 'walker'`);
  res.json(rows);
});

module.exports = router;
