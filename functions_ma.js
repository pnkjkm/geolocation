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
  if(document.getElementById("recordbutton").innerHTML!='◉') {
   var point = new google.maps.LatLng(lat, lng);
   var coords = path.getPath();
   coords.push(point);

 }
}
function animatedMove(marker, t, current, moveto,accuracy) {
  var lat = current.lat();
  var lng = current.lng();

  var deltalat = (moveto.lat() - current.lat()) / 100;
  var deltalng = (moveto.lng() - current.lng()) / 100;

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
}


// window.addEventListener("devicemotion", motion, true);

let lastX, lastY, lastZ,motionind;
let moveCounter = 0;

// function motion(e) {
//
// 	let acc = e.acceleration;
// 	if(!acc.hasOwnProperty('x')) {
// 		acc = e.accelerationIncludingGravity;
// 	}
//
// 	if(!acc.x) return;
//
// 	//only log if x,y,z > 1
// 	if(Math.abs(acc.x) >= 0.0 &&
// 	Math.abs(acc.y) >= 0.0 &&
// 	Math.abs(acc.z) >=0.0) {
// 		// console.log('motion', acc);
// 		if(!lastX) {
// 			lastX = acc.x;
// 			lastY = acc.y;
// 			lastZ = acc.z;
// 			return;
// 		}
//
// 		let deltaX = Math.abs(acc.x - lastX);
// 		let deltaY = Math.abs(acc.y - lastY);
// 		let deltaZ = Math.abs(acc.z - lastZ);
// 		if(deltaX + deltaY + deltaZ > 0) {
//       // console.log('Shake');
//       lastX = acc.x;
//       lastY = acc.y;
//       lastZ = acc.z;
//       motionind= 1;
// 			// moveCounter++;
// 		}
//     else {
// 			// moveCounter = Math.max(0, --moveCounter);
//
//       lastX = acc.x;
//       lastY = acc.y;
//       lastZ = acc.z;
//       motionind= 0;
// 		}
//
// 		// if(moveCounter > 2) {
// 		// 	console.log('SHAKE!!!');
// 		// 	moveCounter = 0;
// 		// }
//
//
//
// 	}
// }

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
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to Start Recording';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.id='recordbutton';
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '45px';
        controlText.style.lineHeight = '60px';
        controlText.style.paddingLeft = '15px';
        controlText.style.paddingRight = '15px';
        controlText.innerHTML = '&#9673;';
        controlUI.appendChild(controlText);
        controlUI.addEventListener('click', function() {
          if(controlText.innerHTML==='◉') {controlText.innerHTML = '&#9612;&#9612;'  ;      controlText.style.fontSize = '20px';}
          else {controlText.innerHTML = '&#9673;'  ;       controlText.style.fontSize = '45px';}
        });



      }
