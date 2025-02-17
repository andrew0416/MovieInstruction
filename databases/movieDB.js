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


  module.exports = {db} ;