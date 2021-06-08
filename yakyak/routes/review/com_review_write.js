var express = require('express');
var router = express.Router();
const path=require('path');
var db_config = require(path.join(__dirname,'../../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var count = '';

router.get('/', function (req, res) {
    var sql = 'SELECT COUNT(*) AS count FROM review';
    var pill_sql = 'SELECT DISTINCT 품목명 FROM pill GROUP BY 품목명 ORDER BY 품목명 ASC';

    console.log(sql);
    conn.query(sql, function(err, rows, fields) {
        // console.log('Query result: ', rows[0].count);
        count = rows[0].count;
    
        if(req && req.session && req.session.count) { 
            // 세션이 존재하는 경우
            conn.query(pill_sql, function(err, rows2, fields){
                if(req && req.session && req.session.count) { 
                    // 세션이 존재하는 경우
                    res.render('com_review_write.ejs',{user:req.session.uid, rows: rows, rows2: rows2, length: rows2.length});
                    console.log(rows2);
                } else { 
                    // 세션이 존재하지 않는 경우
                    var id='';
                    res.render('com_review_write.ejs', {user:id, rows: rows, rows2: rows2, length: rows2.length});
                }
            })

        } else { 
            res.send('<script>alert("로그인이 필요한 서비스입니다.");location.href="/review?page=1";</script>');
            conn.query(pill_sql, function(err, rows2, fields){
                if(req && req.session && req.session.count) { 
                    // 세션이 존재하는 경우
                    res.render('com_review_write.ejs',{user:req.session.uid, rows: rows, rows2: rows2, length: rows2.length});
                    console.log(rows2);
                } else { 
                    // 세션이 존재하지 않는 경우
                    var id='';
                    res.render('com_review_write.ejs', {user:id, rows: rows, rows2: rows2, length: rows2.length});
                }
            })
            // // 세션이 존재하지 않는 경우
            // var id='';
            // res.render('com_review_write.ejs', {user:id});
        }
    });
});
router.post('/', function (req, res) {
    var body = req.body;
    console.log(body);
    var name=req.session.uid;
    var sql = 'INSERT INTO review VALUES(?, ?, ?, ?, ?, ?, NOW(), ?)';
    var params = [parseInt(count)+1, body.yak_type, body.title, name, body.content, 0, 0 ];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log("글 작성 완료");
            res.send('<script>alert("글작성이 완료되었습니다.");location.href="/review?page=1";</script>');
            // <script type="text/javascript">alert("회원가입이 완료되었습니다.");</script>
            // res.redirect('/review');
        }
    });
});

module.exports = router;