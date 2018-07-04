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

      if(req.param('point1') && req.param('point2')){
        var point1 = req.param('point1').split(',');
        var point2 = req.param('point2').split(',');
        console.log(point1);
        console.log(point2);
        con.query('SELECT * FROM markers WHERE lat <= ? AND lat >= ? AND lng >= ? AND lng <= ?'
          , [point1[0],point2[0],point1[1],point2[1]], function (err, result, fields) {
          if (err) throw err;
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
