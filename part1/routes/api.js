var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/dogs', async(req, res) => {
  const [rows] = await db.query(`
    SELECT Dogs.dog_name, Dogs.size, User.username AS owner_username FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
  res.json(rows);
});

module.exports = router;
