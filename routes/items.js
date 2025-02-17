var express = require('express');
var router = express.Router();
var movieDB = require('../databases/movieDB.js')
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')

let db = mariaDB
db.connect();

// 영화 조회
router.get('/', async (req, res, next) => {
  try {
    let screen = await dbUtills.getMovie(db)
    res.send(screen);
  } catch (error) {

  }
  
});

// 영화 등록
router.post('/', async (req, res) => {
  dbUtills.postMovie(req, db)
  try {
    let screen = await dbUtills.getMovie(db)
    res.send(screen);
  } catch (error) {
  }
})

// 특정 영화 조회
router.get('/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let screen = await dbUtills.getMovieDetail(db, id)
    if (screen){
    res.json(screen)
    } else {
    res.send('404')
    }
  } catch (error) {
    
  }
  
}) 

// 특정 영화 수정
router.put('/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id)
    let valid  = await dbUtills.putMovie(req, db, id)
    console.log(valid)
    if (valid){  
      let screen = await dbUtills.getMovieDetail(db, id)
      res.json(screen)
  } else {
      // 404
      res.send('404')
  }
    
  } catch (error) {
    
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
