const mysql = require('mysql');
const express = require('express');
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "wordpressuser",
  password: "root",
  database: "wordpress"
});

con.connect(function(err) {
  if (err) throw err;
  // Select all venues and return the result to be sent.
    app.get('/', function(req, res) {
      con.query('SELECT * FROM markers WHERE country = ?', [req.param('country')], function (err, result, fields) {
        if (err) throw err;
      res.send(result);
      });
    });
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(3000, () => console.log('Listening on port 3000..'));
