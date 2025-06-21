var express = require('express');
var router = express.Router();
var db = require('../models/db');

router.get('/dogs', async(req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT Dogs.dog_id, Dogs.name AS dog_name, Dogs.size, Users.user_id AS owner_id FROM Dogs
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

module.exports = router;
