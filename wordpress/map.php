<!DOCTYPE HTML>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <title>Map</title>
    <style>
      #map {
        height: 100%;
      }
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <div id="map"></div>
    <script>

        function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(42.650692, 23.342963),
          zoom: 2
        });
        var infoWindow = new google.maps.InfoWindow;


        downloadUrl('http://localhost:3000', function(result) {
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
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBiTBKcAUdG9VYCS4wo7Og4DGHIMGnmojc&callback=initMap">
    </script>
  </body>
</html>
