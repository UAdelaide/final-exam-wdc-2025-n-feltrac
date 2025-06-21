var express = require('express');
var router = express.Router();
var db = require('../models/db');

router.get('/dogs', async(req, res) => {
  try { // query changed slightly from part 1 to include dog_id
    const [rows] = await db.query(`
    SELECT Dogs.dog_id, Dogs.name AS dog_name, Dogs.size, Users.user_id AS owner_id FROM Dogs
    INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
    if(rows.length === 0) { // if there are no rows returned
      res.json({ message: "no dogs found in database!" }); // no dogs were found
    } else { // if 1 or more rows were returned from db query:
      res.json(rows); // return the data from the db query
    }
  } catch (error) { // if there was an error:
    res.json({ message: "an error occurred" }); // send error message to display as json
  }
});

module.exports = router;
