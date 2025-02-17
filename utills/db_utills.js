const { query } = require("express");

genreArray = ['판타지', '액션', '로맨스', 'SF', '스릴러']

function postMovie(req, db){
    let movie = req.body
    db.query(`INSERT INTO items (title, author ,year, genre, summary)
    VALUES ('${movie.title}', '${movie.author}', ${movie.year}, ${movie.genre}, '${movie.summary}');`, (err, rows) => {
        if (err) {
            console.error('Error inserting movie:', err);
            return;
        } 
        console.log(`${movie.title}이 등록되었습니다.`);
        console.log(rows);
    });
}

function putMovie(req, db, id){
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM items WHERE id=${id}`, (err, rows) => {
            if (err) {
                console.error('Error fetching data:', err);
                reject('Error fetching data');
                return;
            }
            
            let movie = req.body
            db.query(`UPDATE items SET title='${movie.title}', author='${movie.author}', year=${movie.year},genre=${movie.genre},summary='${movie.summary}' WHERE id=${id}`, (err, rows) => {

                if (err) {
                    console.error('Error fetching data:', err);
                    reject('Error fetching data');
                    return;
                }

                if ((rows.length === 0)){
                    resolve(false);
                }
                console.log(`${movie.title}이 수정되었습니다.`);
                console.log(rows);
                console.log(true)
                resolve(true);
            });

        });

    });
}



function getMovie(db, params){
    return new Promise((resolve, reject) => {
        console.log(params);
        let txt =  "List\n---\n"

        whereString = getFilter(params)
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

function getFilter(params) {
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
                console.error('Error fetching data:', err);
                reject('Error fetching data');
                return;
            }
            if (rows.length === 0){
                resolve(false)
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
                console.error('Error fetching data:', err);
                reject('Error fetching data');
                return;
            }
            if (rows.length === 0){
                resolve(false)
            } else {
                db.query(`DELETE From items WHERE id=${id}`, (err, rows) =>{
                    if (err) {
                        console.error('Error fetching data:', err);
                        reject('Error fetching data');
                        return;
                    }
                    resolve(true)
                });

            }
        });
    });
    
}

module.exports = { postMovie, putMovie ,getMovie, getMovieDetail, deleteMovie };
