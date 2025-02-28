var express = require('express');
var router = express.Router();
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')

var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

router.get('/', function(req, res, next) {
  res.send('로그인 화면');
});

router.post('/', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
          let user = await dbUtills.postLogin(req, db)

          var token = jwt.sign({
            uid: user.uid
          }, process.env.PRIVATE_KEY, {
            expiresIn : '30m',
            issuer : "CREATWATER"
          });

          res.cookie("token", token,{
            httpOnly : true
          });

          res.status(201).json({ 
            message: `${user.nickname}님 환영합니다.`,
            token: token
          });
        } catch (err) {
          if (err=="아이디 없음"){
            res.status(403).json({ err: '해당 아이디가 존재하지 않습니다.' });
          } else if (err=="비밀번호 다름") {
            res.status(403).json({ err: '아이디와 비밀번호가 일치하지않습니다.' });
          } else {
            res.status(500).json({ err: "알 수 없는 요류입니다." });
          }
        }
  });
}) 


module.exports = router;
