var express = require('express');
const path=require('path');
var crypto = require('crypto');
var router = express.Router();

var db_config = require(path.join(__dirname,'../../config/database.js'));
var conn = db_config.init();
db_config.connect(conn);;
 
/* GET home page. */
router.get('/', function (req, res) {
    if(req && req.session && req.session.count) { 
        // 세션이 존재하는 경우
        console.log("세션 존재!");
        res.render('login.ejs',{user:req.session.uid});

    } else { 
        // 세션이 존재하지 않는 경우
        var id='';
        console.log("세션 없음");
        res.render('login.ejs',{user:id});
        // req.session.login = true;
        // req.session.uid = body.id;
        // console.log(req.session.login);
        // req.session.count = 1;
        // req.session.save(function(){
        //     res.render('./index',{user:req.session.uid});
        // });
    }
});

router.post('/', function (req, res) {
    var body = req.body;
    console.log(body);
    const ENCRYPTION_KEY =
    process.env.ENCRYPTION_KEY || 'abcdefghijklmnop'.repeat(2) // Must be 256 bits (32 characters)
    const IV_LENGTH = 16 // For AES, this is always 16

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

    // const encryptResult = encrypt(body.pw)
    var sql = 'SELECT pw FROM information where id=?';
    var params = [body.id, body.pw];
    console.log(sql);
    conn.query(sql, body.id, function(err, result) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else {
            const decryptResult = decrypt(result[0].pw)
            console.log(decryptResult);
            if(body.pw === decryptResult){
                // console.log(req.session);
                // console.log("세션 없음");
                req.session.login = true;
                req.session.uid = body.id;
                console.log(req.session.login);
                req.session.count = 1;
                req.session.save(function(){
                    res.render('./index',{user:req.session.uid});
                });
            }else{

            }
            // <script type="text/javascript">alert("회원가입이 완료되었습니다.");</script>

        }
    });
});
module.exports = router;