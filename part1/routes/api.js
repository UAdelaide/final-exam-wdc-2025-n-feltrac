var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/dogs', async(req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
    if(rows.length === 0) {
      res.status(404).json({ message: "no dogs found in database!" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});

router.get('/walkrequests/open', async(req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time,
    WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username
    FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
    JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open'`);
    if(rows.length === 0) {
      res.status(404).json({ message: "no walk requests found in database!" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});


router.get('/walkrequests/open', async(req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time,
    WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username
    FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
    JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open'`);
    if(rows.length === 0) {
      res.status(404).json({ message: "no walk requests found in database!" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});
router.get('/walkers/summary', async(req, res) => { // not tested properly
  const [rows] = await db.query(`
    SELECT Users.username AS walker_username, COUNT(WalkRatings.rating_id) AS total_ratings,
    ROUND(AVG(WalkRatings.rating), 2) AS average_rating, COUNT(WalkRequests.request_id) AS completed_walks
    FROM Users INNER JOIN WalkRatings ON Users.user_id = WalkRatings.walker_id
    INNER JOIN WalkRequests ON WalkRequests.status = 'completed'
    AND WalkRequests.request_id IN (SELECT request_id FROM WalkApplications
    WHERE WalkApplications.walker_id = Users.user_id AND WalkApplications.status = 'accepted')
    WHERE Users.role = 'walker' GROUP BY Users.user_id, Users.username`);
  res.status(200).json(rows);
});

module.exports = router;
