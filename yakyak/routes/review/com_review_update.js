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
    var sql = 'SELECT * FROM review WHERE review_no=\''+num+';\'';
    var view;
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            if(req && req.session && req.session.count) { 
                // 세션이 존재하는 경우
                res.render('com_review_update.ejs',{user:req.session.uid, num:num,list : rows});
                console.log(rows);
        
            } else { 
                // 세션이 존재하지 않는 경우
                var id='';
                res.render('com_review_update.ejs', {user:id, list : rows});
            }
        }
    });
});

router.post('/', function (req, res) {
    console.log("글 수정");
    var body = req.body;
    console.log(body.content);
    var name=req.session.uid;
    // console.log(typeof(parseInt(count)));

    var sqls = 'UPDATE review set review_title=?, review_content=? WHERE review_no=?';
    var paramss = [body.title, body.content,parseInt(n.num) ];

    console.log(sqls);
    conn.query(sqls, paramss, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log("글 수정 완료");
            res.send('<script>alert("수정되었습니다.");location.href="/review_detail?num='+n.num+'";</script>');
            // res.redirect('/review_detail?num='+n.num);
        }
    });
});
module.exports = router;