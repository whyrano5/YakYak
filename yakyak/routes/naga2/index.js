var express = require('express');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);

router.get('/', function (req, res) {
    var sql = 'DELETE FROM information WHERE id= \''+req.session.uid+'\'';
    console.log(sql);
    var id='';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            if(req && req.session && req.session.count) { 
                // 세션이 존재하는 경우
                console.log("회원 삭제");
                req.session.destroy(function(err){
                    console.log("회원 삭제22222222222");
                    res.redirect('/index');
                });
            } else { 
                // 세션이 존재하지 않는 경우
                res.render('naga.ejs', {user:id, list : rows});
            }
            
        }
    });
});
module.exports = router;