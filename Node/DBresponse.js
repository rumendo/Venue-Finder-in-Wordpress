const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const app = express();

var countryList = [];
var linesArray = fs.readFileSync('countryCodes.txt', 'utf-8');
linesArray = linesArray.split('\n');
var n=0;
Array.prototype.forEach.call(linesArray, function(line){
  newLine = line.split(/[ ]{2,}/);
  countryList[n] = newLine;
  n++;
});

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
          n=0;
          Array.prototype.forEach.call(countryList, function(country){
            if(element.country==country[1]){
              countries[i] = countryList[n][0];
              i++;
            }
            n++;
          });
        });
        countries.sort();
        res.send(countries);
        });
      }

      if(req.param('country')){
        var selectedCountry = '';
        Array.prototype.forEach.call(countryList, function(country){
          if(req.param('country')==country[0]){
            selectedCountry = country[1];
          }
        });
        con.query('SELECT DISTINCT city FROM markers WHERE country = ?', [selectedCountry], function (err, result, fields) {
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

      if(req.param('point1x') && req.param('point1y') && req.param('point2x') && req.param('point2y')){
        var point1x = req.param('point1x');
        var point1y = req.param('point1y');
        var point2x = req.param('point2x');
        var point2y = req.param('point2y');
        console.log(point1x);
        console.log(point2x);
        console.log(point1y);
        console.log(point2y);
        con.query('SELECT * FROM markers WHERE lat <= ? AND lat >= ? AND lng >= ? AND lng <= ?'
          , [point1x,point2x,point1y,point2y], function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result);
        });
      }
    });
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(3000, () => console.log('Listening on port 3000..'));
