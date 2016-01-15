var newMarkers = [];
var timer;
var km;

/**
 * @desc Gets back the map bounds, and then gets the markers by ajax bases on a search query.
 * And sets marker and reports with the json data to the document, but if the user is on the
 * show page of the report it only gets back the data for that specific marker
*/

function getJsonDataForReports(map) {
  if( $('.map-show').length === 0 ) {
    map.addListener('idle', function() {
      if($('.side-modal').length === 0) {
        clearInterval(timer);
        timer = setTimeout(function() {
          // Setting the latitude and longitude corners of the map
          var minlat = map.getBounds().getSouthWest().lat();
          var maxlat = map.getBounds().getNorthEast().lat();
          var minlng = map.getBounds().getSouthWest().lng();
          var maxlng = map.getBounds().getNorthEast().lng();

          // Calculates the kilometers between the latitude and longitude
          km = getDistanceFromLatLonInKm(minlat, minlng, maxlat, maxlng);

          // Gets back the markers with ajax bases up on the latitude, longitude and kilometers within the map
          $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/reports/markers",
            data: {'lat': map.getCenter().lat(), 'lng': map.getCenter().lng(), 'km': km},
            success: function(data){
              // Sets the markers on the map
              setMarkers(data);

              // Sets the reports to the document in: report.js
              setHeightForReportsIndex(data);
            }
          });
        }, 100);
      }
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

/**
 * @desc Sets the marker on the show page
 * @param {json} data The data of the current report
 */

function setMarkerShow(data) {
  var markerContent =
                  '<div class="marker '+data.status+'">' +
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

/**
 * @desc Sets all the markers on the map within the map bounds
 * @param {json} data All the reports found within the map bounds
 */

function setMarkers(data) {
  // Checks if the markers have the same latitude and longitude
  newPositionForOverlapOnMarkers(data);

  // If there is an open info window do nothing
  if ( $('.info-box').length === 0 ) {
    newMarkers = [];

    for (var i = 0; i < data.length; i++) {

      // Sets the html for the marker
      var markerContent =
                      '<div class="marker '+data[i].status+'" data-marker-id="'+data[i].id+'">' +
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

/**
 * @desc Sets the new position of the markers of they have the same latitude and longitude
 * @param {json} data All the reports found within the map bounds
 * @return {json} data Still the same data, but some of them have a new longitude position
 */

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

/**
 * @desc Adds the click event to the marker
 * @param {element} marker Is the current marker on the map
 * @param {number} i Is the index of the current for loop
 */

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
        // Addes the active class on marker if click
        newMarkers[i].content.className = 'marker-active';

        // Gets the data for the info window in: info_window.js
        fetchInfoWindow(marker, i);
        markerClicked = 1;
      }
    };
  })(marker, i));
}

/**
 * @desc Binds the hover function to the marker, and on hover adds and removes
 * The active class from the report in the index
 * @param {element} marker Is the current marker
 */

function addMouseOverAndOutToMarker(marker) {
  google.maps.event.addListener(marker, 'mouseover', function(e) {
    $('.js_all_reports').find('.report-show[data-report-id="'+marker.id+'"]').addClass('active');
  });
  google.maps.event.addListener(marker, 'mouseout', function(e) {
    $('.js_all_reports').find('.report-show[data-report-id="'+marker.id+'"]').removeClass('active');
  });
}

/**
 * @desc calculates the distances to kilometers
 * @param {float} lat1 Is the latitude of the south west corner
 * @param {float} lon1 Is the longitude of the south west corner
 * @param {float} lat2 Is the latitude of the north east corner
 * @param {float} lon2 Is the longitude of the north east corner
 * @return {float} kilometers of the map bounds
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
