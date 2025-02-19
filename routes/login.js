var express = require('express');
var router = express.Router();
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')

router.get('/', function(req, res, next) {
  res.send('로그인 화면');
});

router.post('/', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
          let nickname = await dbUtills.postLogin(req, db)

          res.status(201).json({ message: `${nickname}님 환영합니다.`});
        } catch (err) {
          if (err=="아이디 없음"){
            res.status(409).json({ err: '해당 아이디가 존재하지 않습니다.' });
          } else if (err=="비밀번호 다름") {
            res.status(409).json({ err: '아이디와 비밀번호가 일치하지않습니다.' });
          } else {
            res.status(500).json({ err: "알 수 없는 요류입니다." });
          }
        }
  });
}) 


module.exports = router;
