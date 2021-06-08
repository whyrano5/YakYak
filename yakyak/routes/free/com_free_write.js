var express = require('express');
var router = express.Router();
const path=require('path');
var db_config = require(path.join(__dirname,'../../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var count = '';

router.get('/', function (req, res) {
    var sql = 'SELECT COUNT(*) AS count FROM free';
    console.log(sql);
    conn.query(sql, function(err, rows, fields) {
        // console.log('Query result: ', rows[0].count);
        count = rows[0].count;
    });
    if(req && req.session && req.session.count) { 
        // 세션이 존재하는 경우
        res.render('com_free_write.ejs',{user:req.session.uid});

    } else { 
        // 세션이 존재하지 않는 경우
        var id='';
        res.send('<script>alert("로그인이 필요한 서비스입니다.");location.href="/free?page=1";</script>');
        // res.render('com_free_write.ejs', {user:id});
    }
});
router.post('/', function (req, res) {
    var body = req.body;
    console.log(body);
    var name=req.session.uid;
    var sql = 'INSERT INTO free VALUES(?, ?, ?, ?, ?, NOW(), ?)';
    var params = [parseInt(count)+1, body.title, name, body.content, 0, 0 ];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log("글 작성 완료");
            res.redirect('/free');
        }
    });
});
module.exports = router;