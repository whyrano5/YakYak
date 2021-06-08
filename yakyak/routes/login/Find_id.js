var express = require('express');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);

router.get('/', function(req, res, next){
    if(req && req.session && req.session.count) { 
        // 세션이 존재하는 경우
        res.render('Find_id.ejs',{user:req.session.uid});
        console.log(rows);

    } else { 
        // 세션이 존재하지 않는 경우
        var id='';
        res.render('Find_id.ejs', {user:id});
    }
});

router.post('/', function (req, res) {
    console.log("아이디 찾기");
    var body = req.body;
    console.log(body);
    // console.log(typeof(parseInt(count)));

    var sqls = 'SELECT id FROM information AS id WHERE name=? and email=?';
    var paramss = [ body.nf, body.ef ];

    console.log(sqls);
    conn.query(sqls,paramss, function(err, rows, fields) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log(rows[0]);
            res.send('<script>alert("아이디는'+rows[0].id+' 입니다.");location.href="/login";</script>');
            // res.redirect('/login');
        }
    });
});
module.exports = router;