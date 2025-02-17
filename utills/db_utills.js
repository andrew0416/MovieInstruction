const { query } = require("express");

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



function getMovie(db){
    return new Promise((resolve, reject) => {
        let txt =  "List\n---\n"
        db.query("SELECT id, title From items", (err, rows) => {

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
