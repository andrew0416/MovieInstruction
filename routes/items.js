var express = require('express');
var router = express.Router();
var movieDB = require('../databases/movieDB.js')
var dbUtills = require('../utills/db_utills.js')

let db = movieDB.db
let id = db.size

// 영화 조회
router.get('/', function(req, res, next) {
  screen = dbUtills.getMovie(db, id)
  res.send(screen);
});

// 영화 등록
router.post('/', (req, res) => {
  id++
  dbUtills.postMovie(req, db, id)
  screen = dbUtills.getMovie(db, id)
  res.send(screen);
})

// 특정 영화 조회
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let screen = dbUtills.getMovieDetail(db, id)
  if (screen || (screen == "")){
    res.json(screen)
  } else {
    res.send('404')
  }
}) 

// 특정 영화 수정
router.post('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  if (dbUtills.postMovie(req, db, id, true)){  
    let screen = dbUtills.getMovieDetail(db, id)
    res.json(screen)
  } else {
    // 404
    res.send('404')
  }

}) 

// 특정 영화 삭제
router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  if (dbUtills.deleteMovie(db, id)){  
    res.send('삭제되었습니다.')
  } else {
    res.send('404')
  }

}) 

module.exports = router;
