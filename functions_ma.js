function createRecordButton(map){
  var centerControlDiv = document.createElement('button');
        var centerControl = new CenterControl(centerControlDiv, map);
        centerControlDiv.className ="ripple";
        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
}
function setCurrentPosition(currentp){
  accuracy= currentp.coords.accuracy;
  position = {lat: currentp.coords.latitude,lng: currentp.coords.longitude};
  marker = new google.maps.Marker({
      position: position,
      map: map,
      // icon  :'http://www.robotwoods.com/dev/misc/bluecircle.png'
      icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    strokeColor : '#3333FF',
                    strokeWeight : 5,
                    scale: 2.5
                  },
  });
  enableOrientationArrow();

  circle = new google.maps.Circle({
      center: position,
      radius: accuracy,
      map:map,
      fillColor: '#bfbdb8',
      fillOpacity: 0.05,//opacity from 0.0 to 1.0,
      strokeColor:'blue', //stroke color,
      strokeOpacity: 0.1//opacity from 0.0 to 1.0
  });
  map.fitBounds(circle.getBounds());
  path = new google.maps.Polyline({
  path: polylineCoords,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});
path.setMap(map);
}


function enableOrientationArrow() {

    if (window.DeviceOrientationEvent) {

        window.addEventListener('deviceorientation', function(event) {
            var alpha = null;
            //Check for iOS property
            if (event.webkitCompassHeading) {
                alpha = event.webkitCompassHeading;
            }
            //non iOS
            else {
                alpha = event.alpha;
            }
            var locationIcon = marker.get('icon');
            locationIcon.rotation = 360 - alpha;
            marker.set('icon', locationIcon);
        }, false);
    }
};

function addCoord(lat, lng) {
  if(document.getElementById("recordbutton").innerHTML==='PAUSE') {
   var point = new google.maps.LatLng(lat, lng);
   var coords = path.getPath();
   coords.push(point);

 }
}
function animatedMove(p,marker, t, current, moveto) {
  position = {
    lat: p.coords.latitude,
    lng: p.coords.longitude,
  };
  moveto=new google.maps.LatLng(position.lat, position.lng);
  accuracy= p.coords.accuracy;

  var lat = current.lat();
  var lng = current.lng();

  var deltalat = (moveto.lat() - current.lat()) / 100;
  var deltalng = (moveto.lng() - current.lng()) / 100;
if(getDistance(marker.get('position'),moveto)>2){
  var delay = 10 * t;
  for (var i = 0; i < 100; i++) {
    (function(ind) {
      setTimeout(
        function() {
          var lat = marker.position.lat();
          var lng = marker.position.lng();
          lat += deltalat;
          lng += deltalng;
          latlng = new google.maps.LatLng(lat, lng);
          marker.setPosition(latlng);
          circle.setCenter(latlng);
          circle.setRadius(accuracy);
        }, delay * ind
      );
    })(i)
  }
  addCoord(moveto.lat(),moveto.lng());
  map.panTo(position);
}
}


function rad(x) {
  return x * Math.PI / 180;
};

function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.id='recordbutton';
        controlText.innerHTML = 'START';
        controlUI.appendChild(controlText);
        controlDiv.addEventListener('click', function() {
          if((controlText.innerHTML==='START' )||(controlText.innerHTML==='RESUME' )) {controlText.innerHTML = 'PAUSE'  ;      controlText.style.fontSize = '20px';}
          else {controlText.innerHTML = 'RESUME'  ;       controlText.style.fontSize = '20';}
        });



      }
