var express = require('express');
var router = express.Router();
const Helper = require('../Models/Helper/Helper');
const helper = new Helper();

router.get('/', (req, res) => {
  helper.getAll().then((users) => {
    res.send(users);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = router;