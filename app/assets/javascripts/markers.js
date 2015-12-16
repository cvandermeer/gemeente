/**
  * @desc gets back the map bounds
  * @return json data of reports, with the map bounds
*/

var newMarkers = [];
var timer;
var km;

function getJsonDataForReports(map) {
  if( $('.map-show').length === 0 ) {
    map.addListener('idle', function() {
      clearInterval(timer);
      timer = setTimeout(function() {
        var minlat = map.getBounds().getSouthWest().lat();
        var maxlat = map.getBounds().getNorthEast().lat();
        var minlng = map.getBounds().getSouthWest().lng();
        var maxlng = map.getBounds().getNorthEast().lng();
        km = getDistanceFromLatLonInKm(minlat, minlng, maxlat, maxlng);

        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: "/reports/markers",
          data: {'lat': map.getCenter().lat(), 'lng': map.getCenter().lng(), 'km': km},
          success: function(data){
            setMarkers(data);

            // report.js
            getReportsForIndex(data);
          }
        });
      }, 100);
    });
  } else {
    // Gives back one marker for show
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "/reports/markers",
      data: { 'id': id },
      success: function(data){
        setMarkerShow(data);
      }
    });
  }
}

function setMarkerShow(data) {
  var markerContent =
                  '<div class="marker">' +
                      '<div class="marker-icon '+data.category.title+'">' +
                      '</div>' +
                  '</div>';

  var markerOptions = {
    position: new google.maps.LatLng( data.latitude, data.longitude ),
    map: map,
    draggable: false,
    content: markerContent,
    flat: true
  };

  var marker = new RichMarker(markerOptions);
}

var markerClicked = 0;
var activeMarker = false;
var lastClicked = false;
var markerCluster;

function setMarkers(data) {
  newPositionForOverlapOnMarkers(data);

  if ( $('.info-box').length === 0 ) {
    newMarkers = [];

    for (var i = 0; i < data.length; i++) {
      //var markerContent = document.createElement('DIV');
      var markerContent =
                      '<div class="marker" data-marker-id="'+data[i].id+'">' +
                          '<div class="marker-icon '+data[i].category.title+'">' +
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
      addClickEventToMarker(marker, i);
      addMouseOverAndOutToMarker(marker);
    }
    if ( newMarkers.length ) {
      if (markerCluster) {
        markerCluster.clearMarkers();
      }
      var clusterStyles = [{ url: "cluster.png", height: 34, width: 34}];
      markerCluster = new MarkerClusterer(map, newMarkers, { styles: clusterStyles, maxZoom: 19 });
    }
  }
}

function newPositionForOverlapOnMarkers(data) {
  var dataClone = JSON.parse(JSON.stringify(data));
  for (var a = 0; a < data.length; a++) {
    data[a].count = 0;
  }

  for (var i = 0; i < data.length; i++) {
    for (var f = 0; f < data.length; f++) {
      if (i != f && dataClone[f].latitude == dataClone[i].latitude && dataClone[f].longitude == dataClone[i].longitude) {
        data[f].count += 1;
        data[i].count += 1;
        data[i].longitude += 0.00003 * data[i].count;
      }
    }
  }
  return data;
}

function addClickEventToMarker(marker, i) {
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      google.maps.event.addListener(map, 'click', function(event) {
        lastClicked = newMarkers[i];
      });
      activeMarker = newMarkers[i];
      if( activeMarker != lastClicked || markerClicked === 1){
        for (var h = 0; h < newMarkers.length; h++) {
          newMarkers[h].content.className = ' ';
        }
        newMarkers[i].content.className = 'marker-active';

        // info_window.js
        fetchInfoWindow(marker, i);
        markerClicked = 1;
      }
    };
  })(marker, i));
}

function addMouseOverAndOutToMarker(marker) {
  google.maps.event.addListener(marker, 'mouseover', function(e) {
    $('.reports').find('li[data-reports-id="'+marker.id+'"]').addClass('active');
  });
  google.maps.event.addListener(marker, 'mouseout', function(e) {
    $('.reports').find('li[data-reports-id="'+marker.id+'"]').removeClass('active');
  });
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
  return deg * (Math.PI/180);
}
