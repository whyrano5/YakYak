var express = require('express');
const path=require('path');
var crypto = require('crypto');
var router = express.Router();
 
/* GET home page. */
router.get('/', function (req, res) {
    req.session.destroy(function(err){
        console.log("세션 삭제");
        res.send('<script>alert("로그아웃되었습니다.");location.href="/index";</script>');
        // res.redirect('/index');
    });
});

module.exports = router;