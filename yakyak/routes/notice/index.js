var express = require('express');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);

router.get('/', function (req, res) {
    let { page } = req.query;

    var sql = 'SELECT * FROM notice';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            if(req && req.session && req.session.count) { 
                // 세션이 존재하는 경우
                res.render('notice.ejs',{user:req.session.uid,list : rows, page:page, length:rows.length-1, page_num:10, pass:true});
        
            } else { 
                // 세션이 존재하지 않는 경우
                var id='';
                res.render('notice.ejs', {user:id,list : rows, page:page, length:rows.length-1, page_num:10, pass:true});
            }

        }
    });
});

module.exports = router;