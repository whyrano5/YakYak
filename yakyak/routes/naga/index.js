var express = require('express');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);

router.get('/', function (req, res) {
    var sql = 'SELECT * FROM free';
    var id='';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            if(req && req.session && req.session.count) { 
                // 세션이 존재하는 경우
                res.render('naga.ejs', {user:req.session.uid, list : rows});
        
            } else { 
                // 세션이 존재하지 않는 경우
                res.render('naga.ejs', {user:id, list : rows});
            }
            
        }
    });
});
module.exports = router;