/**
  * @desc gets back the map bounds
  * @return json data of reports, with the map bounds
*/

var newMarkers = [];
var timer;
var km;

function getJsonDataForReports(map) {

  map.addListener('bounds_changed', function() {
    clearInterval(timer)
    timer = setTimeout(function() {
      var minlat = map.getBounds().getSouthWest().lat();
      var maxlat = map.getBounds().getNorthEast().lat();
      var minlng = map.getBounds().getSouthWest().lng();
      var maxlng = map.getBounds().getNorthEast().lng();
      km = getDistanceFromLatLonInKm(minlat, minlng, maxlat, maxlng)

      clearMarkers()

      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/reports/markers",
        data: {'lat': map.getCenter().lat(), 'lng': map.getCenter().lng(), 'km': km},
        success: function(data){
          setMarkers(data)

          // report.js
          getReportIndex(data)
        }
      });
    }, 300);
  });
}

function setMarkers(data) {
  // Needed to require the richmarker file after loading the maps
  initRichMarker()
  var markerClicked = 0;
  var activeMarker = false;
  var lastClicked = false;

  for (var i = 0; i < data.length; i++) {
    var markerContent = document.createElement('DIV');
    markerContent.innerHTML =
                    '<div class="marker">' +
                        '<div class="icon">' +
                        '</div>' +
                    '</div>';

    var marker = new RichMarker({
                  position: new google.maps.LatLng( data[i].latitude, data[i].longitude ),
                  map: map,
                  draggable: false,
                  content: markerContent,
                  flat: true,
                  id: data[i].id
                });

    newMarkers.push(marker);

    // adding click event to marker, show if active
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        google.maps.event.addListener(map, 'click', function(event) {
          lastClicked = newMarkers[i];
        });
        activeMarker = newMarkers[i];
        if( activeMarker != lastClicked ){
          for (var h = 0; h < newMarkers.length; h++) {
            newMarkers[h].content.className = ' ';
          }
          newMarkers[i].content.className = 'marker-active';
          markerClicked = 1;
        }
      }
    })(marker, i));
  }
}

function clearMarkers() {
  setMapOnAll(null);
  newMarkers = []
}

function setMapOnAll(map) {
  for (var i = 0; i < newMarkers.length; i++) {
    newMarkers[i].setMap(map);
  }
}


/**
  * @desc calculates the distances
  * @param floats, latitude and longitude
  * @return the distances of the map bounds
*/

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d/2;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
