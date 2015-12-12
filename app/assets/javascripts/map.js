var mapStyle = [
   {
     featureType: "poi",
     stylers: [
      { visibility: "off" }
     ]
    }
];

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
      styles: mapStyle,
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);

      navigator.geolocation.getCurrentPosition(function(geo) {
        pos = {lat: geo.coords.latitude, lng: geo.coords.longitude};
        zoom = 12;
        map.setCenter(pos);
        map.setZoom(zoom);
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: '<div class="ik-sta-hier">Ik sta hier!</div>'
        });
        setTimeout(function() {
          infowindow.close();
        }, 15000);
      });
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

    setSearchBar(map);
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

//Get latitude and longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    localStorage.authorizedGeoLocation = 1;
}

function errorFunction(){
    localStorage.authorizedGeoLocation = 0;
}

function checkauthorizedGeoLocation(){ // you can use this function to know if geoLocation was previously allowed
  if ( typeof localStorage.authorizedGeoLocation == "undefined" || localStorage.authorizedGeoLocation == "0" ) {
    return false;
  } else {
    return true;
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
  var options = {
    //types: ['(regions)'],
    componentRestrictions: {country: 'nl'}
  };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    }
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
