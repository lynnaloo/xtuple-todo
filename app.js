var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  data = require('./routes/data'),
  Client = require('xtuple-rest-client');

app.locals.title = "xTuple ToDos App";
app.use(express.static(__dirname + '/public'));
app.set('views', path.join( __dirname, "views"));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/todos', data.getAll);
app.post('/add', function (req, res) {
  console.log(req);
  res.send("done");
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("xTuple To Dos is running at localhost:", app.get("port"));
});
