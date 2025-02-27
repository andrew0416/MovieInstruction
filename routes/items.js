var express = require('express');
var router = express.Router();
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')


// 영화 조회
router.get('/', async (req, res, next) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let params = req.query
      let screen = await dbUtills.getMovie(db, params)
      res.send(screen);
    } catch (err) {
      res.status(500).json({ err: "알 수 없는 오류입니다." });
    } 
  });
  
});

// 영화 등록
router.post('/', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      await dbUtills.postMovie(req, db)
      let params = req.query
      let screen = await dbUtills.getMovie(db, params)
      res.send(screen);
    } catch (err) {
      res.status(500).json({ err: "알 수 없는 오류입니다." });
    }
  });
  
})

// 특정 영화 조회
router.get('/:id', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let id = parseInt(req.params.id)
      let screen = await dbUtills.getMovieDetail(db, id)
      res.json(screen)
    } catch (err) {
      if (err == "영화 없음"){
        res.status(404).json({ err: "해당 영화가 존재하지 않습니다." });
      } else {
        res.status(500).json({ err: "알 수 없는 오류입니다." });
      }
    }
  });
}) 

// 특정 영화 수정
router.put('/:id', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let id = parseInt(req.params.id)
      await dbUtills.putMovie(req, db, id)
      let screen = await dbUtills.getMovieDetail(db, id)
      res.json(screen)
    
    } catch (err) {
      if (err="존재하지 않는 영화"){
        res.status(404).json({ err: "해당 영화가 존재하지 않습니다." });
      } else {
        res.status(500).json({ err: "알 수 없는 오류입니다." });
      }
    }
  });
})

// 특정 영화 삭제
router.delete('/:id', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let id = parseInt(req.params.id)
      await dbUtills.deleteMovie(db, id)
      res.send('삭제되었습니다.')
      
    } catch (err) {
      if (err === '잘못된 요청'){
        res.status(400).json({ error: "잘못된 요청입니다." });
      } else {
        res.status(500).json({ error: "알 수 없는 요류입니다." });
      }
    }
    
  })
}) 

module.exports = router;
