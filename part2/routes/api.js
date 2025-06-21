var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET home page. */
router.get('/dogs', async(req, res) => {
  const [rows] = await db.query(`
    SELECT Dogs.dog_id, Dogs.name AS dog_name, Dogs.size, Users.user_id AS owner_id FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
  res.json(rows); // send returned data
});

module.exports = router;
