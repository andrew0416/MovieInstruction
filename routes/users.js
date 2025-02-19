var express = require('express');
var router = express.Router();
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')

router.get('/:id', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let id = req.params.id
      res.send(await dbUtills.getUserDetail(db, id))
    } catch (err) {
      if (err === '아이디 없음') {
        res.status(404).json({ error: '해당 유저는 존재하지 않습니다.' });
    } else {
        res.status(500).json({ error: err });
    }
    }
  });
});

router.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
