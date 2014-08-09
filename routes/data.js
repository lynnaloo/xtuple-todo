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
