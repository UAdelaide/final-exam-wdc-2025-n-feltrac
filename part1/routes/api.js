var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/dogs', function(req, res, next) {
  const [rows] = await db.query(`
    SELECT bl.BookID, bi.Title, u.Name AS SellerName, bl.SellerID
    FROM BookListings bl
    JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
  `);
  res.json(rows);
});

module.exports = router;
