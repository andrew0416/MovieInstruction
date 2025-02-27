var express = require('express');
var router = express.Router();
var mariaDB = require('../databases/mariaDb.js')
var dbUtills = require('../utills/db_utills.js')


// 콜렉션 전체 조회
router.get('/', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let screen = await dbUtills.getCollections(db)
      res.send(screen);
    } catch (err) {
      res.status(500).json({ err: "알 수 없는 오류입니다." });
    } 
  });
  
});

// 콜렉션 생성
router.post('/', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
          let name = await dbUtills.postCollection(req, db)

          res.status(201).json({ message: `${name} 콜렉션이 등록되었습니다.`});
        } catch (err) {
            res.status(500).json({ err: "알 수 없는 오류입니다." });
        }
  });
})

// 콜렉션 개별 조회
router.get('/:cid', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let cid = parseInt(req.params.cid)
      let screen = await dbUtills.getCollectionDetail(db, cid)
      res.json(screen)
    } catch (err) {
      if (err == "잘못된 요청") {
        res.status(404).json({ err: "해당 콜렉션이 존재하지 않습니다." });
      } else {
        res.status(500).json({ err: "알 수 없는 오류입니다." });
      }
    }
  });
})

// 콜렉션 개별 변경
router.put('/:cid', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let cid = parseInt(req.params.cid)
      await dbUtills.putCollection(req, db, cid)
      let screen = await dbUtills.getCollectionDetail(db, cid)
      res.json(screen)
    } catch (err) {
        res.status(500).json({ err: "알 수 없는 오류입니다." });
    }
  });
})

// 콜렉션 개별 삭제
router.delete('/:cid', async (req, res) => {
  mariaDB.getConnection(async (err, db) => {
    try {
      let cid = parseInt(req.params.cid)
      await dbUtills.deleteCollection(db, cid)
      res.send('콜렉션이 삭제되었습니다.')
      
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
