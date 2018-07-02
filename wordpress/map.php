<!DOCTYPE HTML>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <title>Map</title>
    <style>
      #map {
        height: 90%;
      }
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </head>

  <body onload="readCC();">
    <form>
      <input name="country" list="country" id="CC">
      <datalist id="country"></datalist>
      <input name="city" list="city" id="cities">
      <datalist id="city"></datalist>
    </form>
    <div id="countryList"></div>
    <div id="map"></div>
    <script>
      var selCountry = 0;
      var selCity = 0;

      function readCC(){
        var url = 'http://localhost:3000/?load=1';
          downloadUrl(url, function(result) {
            displayCC(result);
        });
      }

      function readCities(country){
        var url = 'http://localhost:3000/?country=' + country;
        downloadUrl(url, function(result) {
          displayCities(result);
        });
      }


      timer2 = 0;
      function selectCountry (){
        readCities(selCountry);
      }
      $("#CC").on('input', function(e){
        selCountry = this.value;
        console.log(selCity);
          if (timer2) {
              clearTimeout(timer2);
          }
          timer2 = setTimeout(selectCountry, 500);
      });

      timer = 0;
      function selectCity (){
          initMap();
      }
      $("#cities").on('input', function(e){
        selCity = this.value;
        console.log(selCity);
          if (timer) {
              clearTimeout(timer);
          }
          timer = setTimeout(selectCity, 500);
      });

      function displayCC(result){
        var options = '';
        Array.prototype.forEach.call(result, function(element){
          options += '<option value="'+element+'"/>';
        });
        document.getElementById('country').innerHTML = options;
      }

      function displayCities(result){
        var options = '';
        Array.prototype.forEach.call(result, function(element){
          options += '<option value="'+element+'"/>';
        });
        document.getElementById('city').innerHTML = options;
      }


      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(42.650692, 23.342963),
          zoom: 2
        });
        var infoWindow = new google.maps.InfoWindow;
        var url = 'http://localhost:3000';
        var data = { 'selCountry': selCountry, 'selCity': selCity};
        var querystring = encodeQueryData(data);
        url = url.concat("/?" + querystring);
        console.log(url);

        downloadUrl(url, function(result) {
          //console.log(result);
          Array.prototype.forEach.call(result, function(element) {
            var id = element.id;
            var name = element.name;
            var address = element.address;
            var type = element.type;
            var point = new google.maps.LatLng(
                parseFloat(element.lat),
                parseFloat(element.lng));

            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = name
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));
            var text = document.createElement('text');
            text.textContent = address
            infowincontent.appendChild(text);

            var marker = new google.maps.Marker({
              map: map,
              position: point,
            });
            marker.addListener('click', function() {
              infoWindow.setContent(infowincontent);
              infoWindow.open(map, marker);
            });
          });
        });
      }

      function downloadUrl(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                callback(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
      }

      function encodeQueryData(data) {
        let ret = [];
        for (let d in data)
         ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
      }

    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBiTBKcAUdG9VYCS4wo7Og4DGHIMGnmojc&callback=initMap">
    </script>
  </body>
</html>
