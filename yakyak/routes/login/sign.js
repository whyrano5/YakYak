// var fs = require('fs');
var express = require('express');
var crypto = require('crypto');

// var bodyParser = require('body-parser');
var router = express.Router();
// router.use(bodyParser.urlencoded({extended: true}));

const path=require('path');
var db_config = require(path.join(__dirname,'../../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);
var id='';  
router.get('/', function (req, res) {
    if(req && req.session && req.session.count) { 
        // 세션이 존재하는 경우
        res.render('sign.ejs',{user:req.session.uid});

    } else { 
        // 세션이 존재하지 않는 경우
        var id='';
        res.render('sign.ejs',{user:id});
    }
});
// router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.post('/', function (req, res) {
    var body = req.body;
    console.log(body);
    // crypto.randomBytes(64,(err,buf)=>{
    //     if(err) throw err;
    //     salt=buf.toString('hex');
    // });

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

    function decrypt(text) {
        const textParts = text.split(':')
        const iv = Buffer.from(textParts.shift(), 'hex')
        const encryptedText = Buffer.from(textParts.join(':'), 'hex')
        const decipher = crypto.createDecipheriv(
          'aes-256-cbc',
          Buffer.from(ENCRYPTION_KEY),
          iv,
        )
        const decrypted = decipher.update(encryptedText)
      
        return Buffer.concat([decrypted, decipher.final()]).toString()
      }

    const encryptResult = encrypt(body.pw)
    const decryptResult = decrypt(encryptResult)
    console.log(body.id);
    if (body.id == '' || encryptResult == '' || body.name == '' ||  body.email == '')
    {
        console.log("오류!!");
        req.session.destroy(function(err){
            console.log("오류 세션 삭제!");
            res.redirect('/sign');
        });
    }
    else 
    {
    var sql = 'INSERT INTO information VALUES(?, ?, ?, ?)';
    var params = [body.id, encryptResult, body.name, body.email];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            // <script type="text/javascript">alert("회원가입이 완료되었습니다.");</script>
            res.redirect('/login');
            }
        });
    }
});

module.exports = router;