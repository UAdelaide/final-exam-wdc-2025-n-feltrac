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
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
  res.json(rows);
});

module.exports = router;
