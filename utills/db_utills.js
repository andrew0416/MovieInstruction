function postMovie(req, db, id, checkExist=false){
    if (checkExist == true){
        if (db.has(id) == false){
            return false;
        }
    }
    db.set(id, req.body)
    console.log(`${db.get(id).title}이 등록되었습니다.`)
    return true;
}

function getMovie(db){
    let txt =  "List\n---\n"
    db.forEach((value, key) => {
        txt += `${key}: ${value.title}\n`;
    });
    console.log(txt)
    return txt
}

function getMovieDetail(db, id){
    if (db.has(id)){
        return db.get(id)
    } else {
        return false
    }
}

function deleteMovie(db, id){
    if (db.has(id)){
        db.delete(id)
        return true
    } else {
        return false
    }
}

module.exports = { postMovie, getMovie, getMovieDetail, deleteMovie };
