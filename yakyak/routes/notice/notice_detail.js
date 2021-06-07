var express = require('express');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var n;
var count;
router.get('/', function(req, res, next){
    let { num } = req.query;
    n=req.query;
    var sql = 'SELECT * FROM notice WHERE notice_no=\''+num+';\'';
    var sqlss = 'UPDATE notice set notice_view=? WHERE notice_no=\''+num+'\'';
    var view;
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            view=parseInt(rows[0].notice_view)+1;
            console.log(view);
            conn.query(sqlss, view, function(err) {
                if(err) console.log('query is not excuted. select fail...\n' + err);
                else {
                    console.log("!33");
                    if(req && req.session && req.session.count) { 
                        // 세션이 존재하는 경우
                        res.render('notice_detail.ejs',{user:req.session.uid, num:num,list : rows});
                        console.log(rows);
                
                    } else { 
                        // 세션이 존재하지 않는 경우
                        var id='';
                        res.render('notice_detail.ejs', {user:id, list : rows});
                    }
                }
            });
        }
    });
});

module.exports = router;