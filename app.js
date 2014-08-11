var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  data = require('./routes/data'),
  bodyParser = require('body-parser'),
  Client = require('xtuple-rest-client');

app.locals.title = "xTuple ToDos App";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join( __dirname, "views"));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/todos', data.getAll);
app.post('/add', data.addTodo);
app.delete('/delete', data.deleteTodo);
app.get('/get', data.getTodo);
app.post('/update', data.updateTodo);

http.createServer(app).listen(app.get("port"), function () {
  console.log("xTuple To Dos is running at localhost:", app.get("port"));
});
