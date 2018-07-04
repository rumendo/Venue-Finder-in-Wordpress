var selCountry = 0;
var selCity = 0;
var latCenter = 42.688058;
var lngCenter = 23.319961;
var url;

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

//timer3 = 0;
function showArea (point1, point2){
  url = 'http://localhost:3000/?point1=' + point1 + '&point2=' + point2;
    initMap(url);
}
$("#submit").on('click', function(e){
  point1 = $("#point1").val().split(', ');
  point2 = $("#point2").val().split(', ');
  // var lat1 = parseFloat(point1[0]);
  // var lng1 = parseFloat(point1[1]);
  // var lat2 = parseFloat(point2[0]);
  // var lng2 = parseFloat(point2[1]);
  // latCenter = (lat2 + lat1)/2;
  // lngCenter = (lng2 + lng1)/2;
  showArea(point1, point2);
//     if (timer3) {
//         clearTimeout(timer3);
//     }
//     timer3 = setTimeout(showArea, 2000);
});

timer2 = 0;
function selectCountry (){
  readCities(selCountry);
}
$("#CC").on('input', function(e){
  selCountry = this.value;
    if (timer2) {
        clearTimeout(timer2);
    }
    timer2 = setTimeout(selectCountry, 500);
});

timer = 0;
$("#cities").on('input', function(e){
  selCity = this.value;
  console.log(selCity);
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(initMap, 500);
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


function initMap(url) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(latCenter, lngCenter),
    zoom: 2
  });
  var infoWindow = new google.maps.InfoWindow;
  if(!url){
    var url = 'http://localhost:3000';
    var data = { 'selCountry': selCountry, 'selCity': selCity};
    var querystring = encodeQueryData(data);
    url = url.concat("/?" + querystring);
  }
  console.log(url);

  downloadUrl(url, function(result) {
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
