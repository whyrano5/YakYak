var express = require('express');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var n;
var s;
var count;
var count2;
router.get('/', function(req, res, next){
    let { num } = req.query;
    n=req.query;
    s=n.i;
    // console.log(n.i);
    console.log("글 삭제");
    var body = req.body;

    var sql = 'DELETE FROM free_comment WHERE free_index=?';
    var sql2 = 'SELECT COUNT(*) AS count FROM free_comment WHERE free_no=?';
    var sql3 = 'UPDATE free set free_comment=? WHERE free_no=?';
    var params = parseInt(n.num);
    var parami = parseInt(n.i);
    console.log(n.i);
    // console.log(sqls);
    conn.query(sql, parami, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log("질문 댓글 테이블 카운터");
            conn.query(sql2, params, function(err, rows2, fields) {
                if(err) console.log('query is not excuted. insert fail...\n' + err);
                else {
                    console.log('Query result2: ', rows2[0].count);
                    count = rows2[0].count;
                    var p= [ count, params ];
                    conn.query(sql3, p, function(err, rows2, fields) {
                        if(err) console.log('query is not excuted. insert fail...\n' + err);
                        else {
                            // res.redirect('/free');
                            res.redirect('/free_detail?num='+n.num);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;