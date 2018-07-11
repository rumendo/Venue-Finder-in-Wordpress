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

function nameToCC(selCountry){
  var selectedCountry = '';
  Array.prototype.forEach.call(countryList, function(country){
    if(selCountry==country[0]){
      selectedCountry = country[1];
    }
  });
  return selectedCountry;
}

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

      var query = 'SELECT * FROM markers WHERE 1';

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

      if(req.param('loadAll')){
        con.query('SELECT * FROM markers', function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
      }

      if(req.param('country')){
        con.query('SELECT DISTINCT city FROM markers WHERE country = ?', [nameToCC(req.param('country'))], function (err, result, fields) {
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
        query += " && country = '" + nameToCC(req.param('selCountry')) + "'";
        console.log(query);
      }
      if(req.param('selCity')){
        query += "&& city = '" + [req.param('selCity')] + "'";
        console.log(query);
      }
      if(req.param('point1x') && req.param('point1y') && req.param('point2x') && req.param('point2y')){
        query += '&& lat <= ' + req.param('point1x') + '&& lat >= ' + req.param('point2x') + '&& lng >= ' + req.param('point1y')+ '&& lng <= ' + req.param('point2y');
        console.log(query);
      }
      if(req.param('selCountry') || req.param('selCity') || (req.param('point1x') && req.param('point1y') && req.param('point2x') && req.param('point2y'))){
        con.query(query, function (err, result, fields) {
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
