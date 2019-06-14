var map, infoWindow, position,marker,accuracy,circle,path,speed;
var polylineCoords = [];


function createMap () {
  var options = {
    center: { lat: 18.5204, lng: 73.8567 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);
  infoWindow = new google.maps.InfoWindow;
  getUserLocation(map);
  createRecordButton(map);
}

function getUserLocation(map) {
    navigator.geolocation.getCurrentPosition(function (currentp) {setCurrentPosition(currentp);
    }, function () {handleLocationError('Geolocation service failed', map.getCenter());}, { enableHighAccuracy: true});
    navigator.geolocation.watchPosition(function (p) {
           animatedMove(p,marker,0.5,marker.get('position'));
    }, function () {handleLocationError('Geolocation service failed', map.getCenter());}, { enableHighAccuracy: true});
}

if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('sw.js');
    console.log('Service Worker registered');
  } catch(error){
    console.log('Service Worker reg failed');
  }
};

function handleLocationError (content, position) {
  infoWindow.setPosition(position);
  infoWindow.setContent(content);
  infoWindow.open(map);
}
