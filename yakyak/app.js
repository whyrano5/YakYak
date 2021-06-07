var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
const path = require('path');
const session = require('express-session')
var FileStore = require('session-file-store')(session)

const app = express();
const port = 3000;
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))

//router
app.use(require('./routes'));

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/view/index.ejs'));
});

app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/sass'));
app.use(express.static(__dirname + '/193 travel DOC'));

// app.post('/writeAf', function (req, res) {
//     var body = req.body;
//     console.log(body);

//     var sql = 'INSERT INTO review_story VALUES(?, ?, ? ,? ,? ,? ,?, ?)';
//     var params = [, body.pw, body.name,date];//여기 그 값들 넣으명 대는데,,
//     console.log(sql);
//     conn.query(sql, params, function(err) {
//         if(err) console.log('query is not excuted. insert fail...\n' + err);
//         else res.redirect('/list');
//     });
// });

// app.post('/delete/:id', function (req, res) {
//     var body = req.body;
//     console.log(body);

//     var sql = 'delete from products where id = ?';
//     var params = [req.params.id];
//     console.log(sql);
//     conn.query(sql, params, function(err) {
//         if(err) console.log('query is not excuted. delete fail...\n' + err);
//         else res.redirect('/list');
//     });
// });
// app.get('/delete/:id', function(req, res){
// 	conn.query('delete from information where id = ?', [req.params.id], 
// 			function(error, result){
// 				if(error){
// 					console.log('delete Error');
// 				}else{
// 					console.log('delete id = %d', req.params.id);
// 					res.redirect('/list');				
// 				}
// 			});
// });
module.exports = app;
app.listen(3000, () => console.log('Server is running'));



