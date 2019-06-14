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

  // if (navigator.geolocation) {
  //             getUserLocation(map);
  //             // setInterval(function () {
  //             //     getUserLocation(map);
  //             // }, 5000);
  //         }
  //         else {
  //           handleLocationError('No geolocation available.', map.getCenter());
  //         }


  var input_1 = document.getElementById('search_1');
  console.log(input_1);
  var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
  // var searchBox_1 = new google.maps.places.SearchBox(input_1);
  //
  // map.addListener('bounds_changed', function() {
  //   searchBox_1.setBounds(map.getBounds());
  // });

}
function getUserLocation(map) {

    navigator.geolocation.watchPosition(function (p) {
      position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      };
      positionlatlng=new google.maps.LatLng(position.lat, position.lng);
      accuracy= p.coords.accuracy;
       // infoWindow.setPosition(position);
       // infoWindow.setContent('Your location!');
       // infoWindow.open(map);

       if (marker != undefined){

         if(getDistance(marker.get('position'),positionlatlng)>2){
           animatedMove(marker,0.5,marker.get('position'),positionlatlng,accuracy);
           map.setCenter(position);

        // marker.setPosition(position);
        // circle.setCenter(position);
        // circle.setRadius(accuracy);
        // addCoord(position.lat,position.lng);
        // map.setCenter(position);

}
      }
        else{
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

       // addMarker(current_location);

    }, function () {
      handleLocationError('Geolocation service failed', map.getCenter());
    }, { enableHighAccuracy: true,maximumAge:2000});
}



if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('sw.js');
    console.log('Service Worker registered');
  } catch(error){
    console.log('Service Worker reg failed');
  }
};


// add marker function
function addMarker(props){
  var marker = new google.maps.Marker({
    position:props.coords,
    map:map,
    //icon:props.iconImage
  });

  // Check for customicon
  if(props.iconImage){
    // Set icon image
    marker.setIcon(props.iconImage);
  }

  // Check content
  if(props.content){
    var infoWindow = new google.maps.InfoWindow({
      content:props.content
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
   }
  }



function handleLocationError (content, position) {
  infoWindow.setPosition(position);
  infoWindow.setContent(content);
  infoWindow.open(map);
}
