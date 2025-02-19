# 영화 소개 API 구현

# 영화
## GET /items
- 영화 전체 목록을 본다.
- 파라미터를 통해 필터링 가능하다.
## GET items/:id
- 특정 id 영화의 상세 정보 검색
## POST /items
- 영화를 등록함
## PUT items/:id
- 특정 id 영화의 정보를 수정함
## DELETE items/:id
- 특정 id 영화를 데이터베이스에서 삭제함
---
# 유저
## POST /join
- body 정보 기반 회원가입
## POST /login
- body 정보 기반 로그인
## GET /user/:id
- 해당 아이디의 유저의 마이페이지에 접속한다.
## DELETE /user/:id
- 해당 아이디의 유저를 db에서 삭제한다.
---
