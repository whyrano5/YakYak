var express = require('express');
var crypto = require('crypto');
var router = express.Router();

const path=require('path');
var db_config = require(path.join(__dirname,'../../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var id='';  
router.get('/', function (req, res) {
    var sql = 'SELECT * FROM information WHERE id= \''+req.session.uid+'\'';
    console.log(sql);
    var id='';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            if(req && req.session && req.session.count) { 
                // 세션이 존재하는 경우
                res.render('member.ejs', {user:req.session.uid, list : rows});
        
            } else { 
                // 세션이 존재하지 않는 경우
                res.render('member.ejs', {user:id, list : rows});
            }
            
        }
    });
});

router.post('/', function (req, res) {
    var body = req.body;
    console.log(body);

    if(body.pw===''){
        var sql = 'update information set name = ?, email = ? WHERE id = ?';
        var params = [body.name, body.email, req.session.uid];
        console.log(sql);
        conn.query(sql, params, function(err) {
            if(err) {
                console.log('query is not excuted. insert fail...\n' + err);
            }
            else {
                console.log("회원 정보 수정 완료");
                res.redirect('/member');   
            }
        });

    }else{
        // console.log("안비어썰~");
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
        const encryptResult = encrypt(body.pw);
        var sql = 'update information set pw = ?, name = ?, email = ? WHERE id = ?';
        var params = [encryptResult, body.name, body.email, req.session.uid];
        console.log(sql);
        conn.query(sql, params, function(err) {
            if(err) {
                console.log('query is not excuted. insert fail...\n' + err);
            }
            else {
                console.log("회원 정보 수정 완료");
                res.redirect('/member');   
            }
        });
    }
});

module.exports = router;  