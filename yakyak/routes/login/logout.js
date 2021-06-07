var express = require('express');
const path=require('path');
var crypto = require('crypto');
var router = express.Router();
 
/* GET home page. */
router.get('/', function (req, res) {
    req.session.destroy(function(err){
        console.log("세션 삭제");
        res.redirect('/index');
    });
});

module.exports = router;