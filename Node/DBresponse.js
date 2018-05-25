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
  con.query("SELECT * FROM mark", function (err, result, fields) {
    if (err) throw err;
      app.get('/', (req, res) => res.send(result));
    });
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(3000, () => console.log('Listening on port 3000..'));
