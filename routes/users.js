var express = require('express');
var router = express.Router();
const db = require('../Models/postgresProvider')

// ------------------------------------------------------------------

router.get('/', (req, res) => {
  db.getAllUsers().then((users) => {
    res.send(users);
  }).catch((err) =>
    res.send(err)
  );
});


// ------------------------------------------------------------------

module.exports = router;