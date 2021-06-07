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
    console.log("글 삭제");
    var body = req.body;

    var sqls = 'DELETE FROM notice WHERE notice_no=?';
    var params = parseInt(n.num);
    console.log(sqls);
    conn.query(sqls, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            console.log("글 삭제 완료");
            res.redirect('/notice');
        }
    });
});

module.exports = router;