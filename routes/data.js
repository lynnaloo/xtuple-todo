var Client = require('xtuple-rest-client');

exports.getAll = function (req, res) {
  new Client(function (client) {
    client.query({
      type: 'ToDo',
      method: 'list',
      params: { maxResults: 50 },
      callback: function (err, result) {
        if (err) {
          res.send('Error:', err);
        }
        if (result) {
          res.send(result.data.data);
        }
      }
    });
  });
};

exports.addTodo = function (req, res){
  new Client(function (client) {
    client.query({
      type: 'ToDo',
      method: 'insert',
      params: {
        dueDate: req.query.duedate,
        name: req.query.name,
        isActive:req.query.isActive,
        status: req.query.status
      },
      callback: function (err, result) {
        if (err) {
          res.send('Error:', err);
          return;
        }
        justAdded = result.data.uuid;
        //res.send('Inserted:', result.data.uuid);
      }
    });
  });
};
