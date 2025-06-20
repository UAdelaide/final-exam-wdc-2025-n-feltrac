var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/dogs', async(req, res, next) {
  const [rows] = await db.query(`SELECT * FROM Dogs`);
  res.json(rows);
});

module.exports = router;
