var express = require('express');
var app = express();
var sql = require('sqlite3');
var db = new sql.Database('chan.db');

app.set('view engine', 'jade');

app.get('/postit', function(req, res){
  db.run(
    "INSERT INTO posts (time,text) values (strftime('%s','now'), ?)",
    req.param('text','no text'),
    function(e,r){res.redirect('/');});
    console.log('get text ', req.param('text','no text'));
});

app.use(express.static('public'));
app.use(/^\/$/, function(req, res){
  db.all("select * from posts", function(e,r){
    res.render('chan',{data:r});
  });
});

app.use(function(req, res, next){
  res.status(404).end();
});
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Chan listening at http://%s:%s', host, port)

});
