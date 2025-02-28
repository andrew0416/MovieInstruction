const { query } = require("express");

let genreArray = ['판타지', '액션', '로맨스', 'SF', '스릴러']

// movie
function postMovie(req, db){
    return new Promise((resolve, reject) => {
        let movie = req.body
        db.query(`INSERT INTO items (title, author ,year, genre, summary)
        VALUES ('${movie.title}', '${movie.author}', ${movie.year}, ${movie.genre}, '${movie.summary}');`, (err, rows) => {
            if (err) {
                console.error('Error inserting movie:', err);
                reject('Error fetching data');
                return;
            } 
            console.log(`${movie.title}이 등록되었습니다.`);
            resolve(true);
        });
    });
    
}

function putMovie(req, db, id){
    return new Promise((resolve, reject) => {
        let movie = req.body
        db.query(`UPDATE items SET title='${movie.title}', author='${movie.author}', year=${movie.year},genre=${movie.genre},summary='${movie.summary}' WHERE id=${id}`, (err, rows) => {

            if (err) {
                reject(err);
                return;
            }
            if ((rows.length === 0)){
                reject("존재하지 않는 영화");
            }
            resolve(true);
        });
    });
}

function getMovie(db, params){
    return new Promise((resolve, reject) => {
        console.log(params);
        let txt =  "List\n---\n"

        whereString = genreFilter(params)
        if (whereString != ""){
            whereString = " WHERE " + whereString
        }
        console.log(whereString);

        db.query("SELECT id, title From items"+whereString, (err, rows) => {

            if (err) {
                console.error('Error fetching data:', err);
                reject('Error fetching data');
                return;
            }

            let queryArray = rows.map(row => ({ id: row.id, title: row.title }));

            queryArray.forEach( element => {
            console.log('Element: ', element);
            txt += `${element.id}: ${element.title}\n`;
        });

        console.log(txt);
            resolve(txt);

        });
    });
}

function genreFilter(params) {
    let arr = [];

    if (params.t) { // 제목 매칭
        arr.push(`title like '%${params.t}%'`);
    }
    if (params.a) { // 작가 매칭
        arr.push(`author like '%${params.a}%'`);
    }
    if (params.y) { // 연도 일치
        arr.push(`year = ${parseInt(params.y)}`);
    }
    if (params.g) { // 장르 포함
        let idx = genreArray.indexOf(params.g);
        if (idx !== -1) {
            let gCode = Math.pow(2, idx);
            console.log(gCode)
            arr.push(`(genre & ${gCode}) = ${gCode}`);
        }
    }
    console.log(arr.join(" AND "))
    return arr.join(" AND "); // 조건들을 "AND"로 연결해서 반환
}

function getMovieDetail(db, id){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * From items WHERE id=${id}`, (err, rows) => {
            if (err) {
                reject(err);
            }
            if (rows.length === 0){
                reject("영화 없음");
            } else {
                console.log(rows)
                resolve(rows[0])
            }
        });
    });
}

function deleteMovie(db, id){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * From items WHERE id=${id}`, (err, rows) => {
            if (err) {
                reject(err.code);
            }
            if (rows.length === 0){
                reject('잘못된 요청')
            } else {
                db.query(`DELETE From items WHERE id=${id}`, (err, rows) =>{
                    if (err) {
                        reject(err.code)
                    }
                    resolve(true)
                });

            }
        });
    });
    
}

// user
function postJoin(req, db){
    return new Promise((resolve, reject) => {
        let user = req.body
        db.query(`INSERT INTO users (id, password ,nickname)
        VALUES (\'${user.id}\', \'${user.password}\', \'${user.nickname}\');`, (err, rows) => {
            console.log(rows)
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.error('실패: 아이디 중복');
                    reject('아이디 중복');
                } else {
                    reject(err.code);
                }
                return;
            } 
            console.log(`${user.id}이 등록되었습니다.`);
            resolve(true);
        });
    });
}

function postLogin(req, db){
    return new Promise((resolve, reject) => {
        let user = req.body
        db.query(`SELECT COUNT(*) as cnt FROM users WHERE id='${user.id}'`, (err, rows) => {
            if (err) {
                reject(err.code);
            }
            if (rows[0].cnt == 1){
                db.query(`SELECT uid, password, nickname FROM users WHERE id='${user.id}'`, (err, rows) =>{
                    if (err) {
                        reject(err.code);
                    }
                    if (rows[0].password == user.password) {
                        resolve(rows[0])
                    } else {
                        reject('비밀번호 다름');
                    }
                    
                });
            } else {
                reject('아이디 없음');
            }
        });
    });
}

function getUserDetail(db, id){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * From users WHERE id='${id}'`, (err, rows) => {
            if (err) {
                reject(err.code);
            }
            if (rows.length === 0){
                reject('아이디 없음');
            } else {
                resolve(`${rows[0].nickname}님의 페이지입니다.`)
            }
        });
    });
}

// collection
function postCollection(req, db){
    return new Promise((resolve, reject) => {
        let collection = req.body
        db.query(`INSERT INTO collections (name , uid)
        VALUES (\'${collection.name}\', ${collection.uid});`, (err, rows) => {
            console.log(rows)
            if (err) {
                    reject(err.code);
            } 
            console.log(`${collection.name} 콜렉션이 등록되었습니다.`);
            resolve(collection.name);
        });
    });
}

function getCollections(db){
    return new Promise((resolve, reject) => {
        let txt =  "List\n---\n"
        db.query("SELECT cid, name From collections", (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const queryArray = rows.map(row => ({ cid: row.cid, name: row.name}));

            queryArray.forEach( element => {
            console.log('Element: ', element);
            txt += `${element.cid}: ${element.name}\n`;});

            resolve(txt);
        });
    });
}

function getCollectionDetail(db, cid){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * From collections WHERE cid=${cid}`, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            if (rows.length === 0){
                reject("잘못된 요청");
            } else {
                resolve(rows[0])
            }
        });
    });
}

function putCollection(req, db, cid){
    return new Promise((resolve, reject) => {
        let collection = req.body
        db.query(`UPDATE collections SET name='${collection.name}'`, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

function deleteCollection(db, cid){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * From collections WHERE cid=${cid}`, (err, rows) => {
            if (err) {
                reject(err.code);
            }
            if (rows.length === 0){
                reject('잘못된 요청')
            } else {
                db.query(`DELETE From collections WHERE cid=${cid}`, (err, rows) =>{
                    if (err) {
                        reject(err.code)
                    }
                    resolve(true)
                });
            }
        });
    });
    
}

module.exports = { postMovie, putMovie ,getMovie, getMovieDetail, deleteMovie, postJoin, postLogin, getUserDetail, postCollection, getCollections, getCollectionDetail, putCollection, deleteCollection};
