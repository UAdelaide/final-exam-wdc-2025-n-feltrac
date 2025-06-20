var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/dogs', async(req, res) => {
  const [rows] = await db.query(`SELECT dog_name, size, owner_username FROM Dogs`);
  res.json(rows);
});

module.exports = router;
