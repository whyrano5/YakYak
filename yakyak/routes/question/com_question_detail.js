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
    var sql = 'SELECT * FROM quest WHERE quest_no=\''+num+';\'';
    var sqls = 'SELECT * FROM quest_comment where quest_no=\''+num+';\''; 
    var sqlss = 'UPDATE quest set quest_view=? WHERE quest_no=\''+num+'\'';
    var view;
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            view=parseInt(rows[0].quest_view)+1;
            console.log(view);
            conn.query(sqls, function (err, rows2, fields) {
                if(err) console.log('query is not excuted. select fail...\n' + err);
                else {
                    console.log("2!!");
                    conn.query(sqlss, view, function(err) {
                        if(err) console.log('query is not excuted. select fail...\n' + err);
                        else {
                            console.log("!33");
                            if(req && req.session && req.session.count) { 
                                // 세션이 존재하는 경우
                                res.render('com_question_detail.ejs',{user:req.session.uid, num:num,list : rows, comment:rows2});
                                console.log(rows);
                        
                            } else { 
                                // 세션이 존재하지 않는 경우
                                var id='';
                                res.render('com_question_detail.ejs', {user:id, list : rows, comment:rows2});
                            }
                        }
                    });
                }
            });
        }
    });
    var sql2 = 'SELECT COUNT(*) AS count FROM quest_comment';
    console.log(sql2);
    conn.query(sql2, function(err, rows, fields) {
        console.log('Query result: ', rows[0].count);
        count = rows[0].count;
    });
});

router.post('/', function (req, res) {
    console.log("댓글");
    var body = req.body;
    // console.log(body);
    var name=req.session.uid;
    // console.log(typeof(parseInt(count)));

    var sql = 'INSERT INTO quest_comment VALUES(?, ?, ?, ?, NOW())';
    var sqls = 'UPDATE quest set quest_comment=? WHERE quest_no=?';
    var params = [parseInt(count)+1, parseInt(n.num), name, body.editor ];
    var paramss = [parseInt(count)+1, parseInt(n.num) ];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log("댓글 작성 완료");
            conn.query(sqls, paramss, function(err) {
                if(err) console.log('query is not excuted. insert fail...\n' + err);
                else {
                    console.log("뷰 업데이트 완료");
                    // <script type="text/javascript">alert("회원가입이 완료되었습니다.");</script>
                    res.redirect('question_detail?num='+n.num);
                }
            });
            // <script type="text/javascript">alert("회원가입이 완료되었습니다.");</script>
            // res.redirect('quest_detail?num='+n.num);
        }
    });
});
module.exports = router;