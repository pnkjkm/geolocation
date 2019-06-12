var map, infoWindow, position;

function createMap () {
  var options = {
    center: { lat: 18.5204, lng: 73.8567 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);
  infoWindow = new google.maps.InfoWindow;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
      position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      };


       // infoWindow.setPosition(position);
       // infoWindow.setContent('Your location!');
       // infoWindow.open(map);
       map.setCenter(position);
      var current_location =
       {
         coords:position,
         iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
         content:'Your Location'
       };

       addMarker(current_location);

    }, function () {
      handleLocationError('Geolocation service failed', map.getCenter());
    }, {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
  } else {
    handleLocationError('No geolocation available.', map.getCenter());
  }

  var input_1 = document.getElementById('search_1');
  console.log(input_1);
  // var searchBox_1 = new google.maps.places.SearchBox(input_1);
  //
  // map.addListener('bounds_changed', function() {
  //   searchBox_1.setBounds(map.getBounds());
  // });

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
