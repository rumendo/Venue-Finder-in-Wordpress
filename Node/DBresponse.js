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
      if(req.param('load')){
        con.query('SELECT DISTINCT country FROM markers', function (err, result, fields) {
          if (err) throw err;
        countries = [];
        i=0;
        Array.prototype.forEach.call(result, function(element){
          countries[i] = element.country;
          i++;
        });
        countries.sort();
        res.send(countries);
        });
      }

      if(req.param('country')){
        con.query('SELECT DISTINCT city FROM markers WHERE country = ?', [req.param('country')], function (err, result, fields) {
          if (err) throw err;
        cities = [];
        i=0;
        Array.prototype.forEach.call(result, function(element){
          cities[i] = element.city;
          i++;
        });
        cities.sort();
        res.send(cities);
        });
      }
      
      if(req.param('selCountry')){
        if(req.param('selCity')){
          var selCountry = req.param('selCountry');
          var selCity = req.param('selCity');
          console.log(selCity);
          con.query('SELECT * FROM markers WHERE city = ?', [selCity], function (err, result, fields) {
          if (err) throw err;
          res.send(result);
          });
        }else{
          con.query('SELECT * FROM markers WHERE country = ?', [req.param('selCountry')], function (err, result, fields) {
          if (err) throw err;
          res.send(result);
          });
        }
      }
    });
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(3000, () => console.log('Listening on port 3000..'));
