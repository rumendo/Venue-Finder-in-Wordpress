var selCountry = 0;
var selCity = 0;
var lat = 42.688058;
var lng = 23.319961;
var zoom = 2;
var splitLocation = 0;

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

timer3 = 0;
function center (){
  zoom = 12;
  initMap();
}
$("#center").on('input', function(e){
  splitLocation = this.value.split(';');
  lat = splitLocation[0];
  lng = splitLocation[1];
    if (timer3) {
        clearTimeout(timer3);
    }
    timer3 = setTimeout(center, 2000);
});

timer2 = 0;
function selectCountry (){
  zoom = 2;
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
function selectCity (){
  zoom = 2;
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
    center: new google.maps.LatLng(lat, lng),
    zoom: zoom
  });
  var infoWindow = new google.maps.InfoWindow;
  var url = 'http://localhost:3000';
  var data = { 'selCountry': selCountry, 'selCity': selCity};
  var querystring = encodeQueryData(data);
  url = url.concat("/?" + querystring);
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
