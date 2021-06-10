var express = require('express');
var request = require('request');
let cheerio=require('cheerio');
var router = express.Router();
var url = require('url');

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);


/* GET home page. */
// router.get('/', function (req, res) {
//     res.render('index.ejs');
// });

router.get('/', function(req, res, next){
    let { data } = req.query;
    let { page } = req.query;

    if(data=="해열.진통.소염제"||data=="혈압강하제"||data=="당뇨병용제"||data=="진해거담제"||data=="최면진정제"||data=="구충제"){
        var sql = 'SELECT * FROM pill WHERE 분류명=\''+data+'\''; 
    }
    else if(data==""){
        var sql = 'SELECT * FROM pill ';
    }
    else{
        var sql = 'SELECT * FROM pill WHERE 품목명 LIKE \'\%'+data+'\%\' OR  분류명 LIKE \'\%'+data+'\%\' OR 업소명 LIKE \'\%'+data+'\%\'';
    }
 
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            if(req && req.session && req.session.count) {
                // 세션이 존재하는 경우
                res.render('about.ejs',{user:req.session.uid, rows: rows, page:page, length:rows.length-1, page_num:10, pass:true,data1:data});
                console.log(rows);
        
            } else { 
                // 세션이 존재하지 않는 경우
                var id='';
                res.render('about.ejs', {user:id, rows: rows, page:page, length:rows.length-1, page_num:10, pass:true,data1:data});
            }
        }
    });
})

module.exports = router;