var express = require('express');
var crypto = require('crypto');
var router = express.Router();

const path=require('path');
// console.log(path.join(__dirname,'../../config/database.js'));
var db_config = require(path.join(__dirname,'../../config/database.js'));
// console.log(require(__dirname+'../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var n;
router.get('/', function(req, res, next){
    let { num } = req.query;
    n = req.query;
    if(req && req.session && req.session.count) { 
        // 세션이 존재하는 경우
        res.render('Find_pw_change.ejs',{user:req.session.uid});
        console.log(rows);

    } else { 
        // 세션이 존재하지 않는 경우
        var id='';
        res.render('Find_pw_change.ejs', {user:id});
    }
});

router.post('/', function (req, res) {
    let { num } = req.query;
    console.log("새 비번 저장");
    var body = req.body;
    console.log(body);

    if(body.nf===body.ef){
        const ENCRYPTION_KEY =
        process.env.ENCRYPTION_KEY || 'abcdefghijklmnop'.repeat(2) // Must be 256 bits (32 characters)
        const IV_LENGTH = 16 // For AES, this is always 16
    
        function encrypt(text) {
            const iv = crypto.randomBytes(IV_LENGTH)
            const cipher = crypto.createCipheriv(
                'aes-256-cbc',
                Buffer.from(ENCRYPTION_KEY),
                iv,
            )
            const encrypted = cipher.update(text)
    
            return (
                iv.toString('hex') +
                ':' +
                Buffer.concat([encrypted, cipher.final()]).toString('hex')
            )
        }
        const encryptResult = encrypt(body.nf);
        var sql = 'update information set pw=? WHERE id = ?';
        var params = [encryptResult, n.data];
        console.log(n.data);
        console.log(sql);
        conn.query(sql, params, function(err) {
            if(err) {
                console.log('query is not excuted. insert fail...\n' + err);
            }
            else {
                console.log("새 비번 업뎃 완료");
                res.send('<script>alert("비밀번호가 변경되었습니다.");location.href="/login";</script>');
                // res.redirect('/login');   
            }
        });

    }else{
        // console.log("안비어썰~");

    }
});


module.exports = router;