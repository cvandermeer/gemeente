var ready;
var map;

var pos;
var zoom;

//var google;

ready = function() {
  resetMap();
};

/**
  * @desc initializes the google maps javascript api
  * @return if geolocation is active go to users current position else center of the map
*/
var report_show_position;

function initMap() {
  if ($('#map').length) {
    pos = {lat: 52.397, lng: 5.544};
    zoom = 9;

    if($('.community-data').length){
      pos = {lat: parseFloat($('.community-data').attr('data-lat')), lng: parseFloat($('.community-data').attr('data-lon'))};
      zoom = 10;
    }

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: pos,
      disableDefaultUI: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      minZoom: 9,
      zoomControl: true,
      zoomControlOptions: {
         position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      draggable: true
    });

    if ($('#pac-input').length) {
      navigator.geolocation.getCurrentPosition(function(geo) {
        pos = {lat: geo.coords.latitude, lng: geo.coords.longitude};
        zoom = 12;
        map.setCenter(pos);
        map.setZoom(zoom);
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'U staat hier!'
        });
        setTimeout(function() {
          infowindow.close();
        }, 15000);
      });

      setSearchBar(map);
    }

    if ($('.map-show').length){
      var lat = parseFloat($('.map-show').attr('data-lat'));
      var lng = parseFloat($('.map-show').attr('data-lon'));
      report_show_position = {lat: lat, lng: lng};
      map.setCenter(report_show_position);
      map.setZoom(18);

      var sv = new google.maps.StreetViewService();
      sv.getPanorama({location: report_show_position, radius: 50}, processSVData);
    }

    // Needed to require the richmarker and infobox file after loading the maps
    initRichMarker();
    initInfoBox();

    // markers.js
    getJsonDataForReports(map);
  }

}

var radius = 50;
function processSVData(data, status) {
  var sv = new google.maps.StreetViewService();
  if (status === google.maps.StreetViewStatus.OK) {
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: data.location.latLng
      }
    );

    map.setStreetView(panorama);
    var panoMarker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: report_show_position,
      map: panorama
    });
  } else {
    if (radius < 10000) {
      radius =+ 1000;
      sv.getPanorama({location: report_show_position, radius: radius}, processSVData);
    }
  }
}

/**
  * @desc resets the map
  * @return on a specific location to show the Netherlands
*/

function resetMap() {
  $('.reset-map').on('click', function(){
    map.setCenter(pos);
    map.setZoom(zoom);
  });
}

/**
  * @desc initializes the google maps search bar
  * @param function map - google maps javascript api
  * @return the new position of the location searched
*/

function setSearchBar(map) {
  // Search bar with autocomplete
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if ( places.length === 0 ) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
