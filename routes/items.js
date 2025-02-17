var express = require('express');
var router = express.Router();

movie_1 = {
  "title": "영화 A",
  "author": "작가 a",
  "year": 2001,
  "genre": "판타지",
  "summary": "설명 1"
}

movie_2 = {
  "title": "시리즈X - 영화 B",
  "author": "작가 b",
  "year": 2005,
  "genre": "판타지",
  "summary": "설명 3"
}

movie_3 = {
  "title": "영화 C",
  "author": "작가 c",
  "year": 2007,
  "genre": "액션",
  "summary": "설명 3"
}

movie_4 = {
  "title": "시리즈X - 영화 D",
  "author": "작가 b",
  "year": 2007,
  "genre": "판타지",
  "summary": "설명 4"
}

let db = new Map()

db.set(1, movie_1)
db.set(2, movie_2)
db.set(3, movie_3)
db.set(4, movie_4)


// 영화 조회
router.get('/', function(req, res, next) {
  console.log(db.size)
  for (let i = 1; i < db.size+1; i++) {
    console.log(`${i}: ${db.get(i).title}`)
  }
  res.send('respond with a resource');
});

// 영화 등록
router.post('/', (req, res) => {
  db.set(db.size+1, req.body)
  console.log(db.get(db.size))
  res.send('')
})

// 특정 영화 조회
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  if (db.has(id) == true){
    res.json(db.get(id))
  } else {
    // 404
    res.send('404')
  }

}) 

// 특정 영화 수정
router.post('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  if (db.has(id) == true){  
    db.set(id, req.body)
    console.log(db.get(id))
    res.send('')
  } else {
    // 404
    res.send('')
  }

}) 

// 특정 영화 삭제
router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  if (db.has(id) == true){  
    db.delete(id)
    res.send('')
  } else {
    // 404
    res.send('')
  }

}) 

module.exports = router;
