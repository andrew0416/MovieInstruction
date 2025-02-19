var express = require('express');
var router = express.Router();
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')


router.get('/', (req, res, next) => {
  res.send('회원가입 페이지');
});

router.post('/', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      await dbUtills.postJoin(req, db)
      res.status(201).json({ message: '회원가입 성공!' });
    } catch (err) {
      if (err === '아이디 중복') {
        res.status(409).json({ error: '동일한 아이디가 이미 존재합니다.' });
    } else {
        res.status(500).json({ error: "알 수 없는 요류입니다." });
    }
    }
  });
  });
  

module.exports = router;
