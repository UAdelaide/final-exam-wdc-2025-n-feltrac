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
      res.json({ message: "no dogs found in database!" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.json({ message: "an error occurred" });
  }
});

router.get('/walkrequests/open', async(req, res) => {

  try {
    const [rows] = await db.query(`
    SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
    if(rows.length === 0) {
      res.json({ message: "no dogs found in database!" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.json({ message: "an error occurred" });
  }
});

router.get('/walkers/summary', async(req, res) => {
  const [rows] = await db.query(`
    SELECT Users.username AS walker_username,
    COUNT(SELECT * FROM WalkRatings INNER JOIN Users ON WalkRatings.walker_id = Users.user_id
    WHERE Users.role = "walker" AND uhhhhhhhhhhhhh ),
    avg AS average_rating, completed_walks
    FROM WalkRequests INNER JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE User.role = 'walker'`);
  res.json(rows);
});

module.exports = router;
