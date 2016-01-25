// Sets the map styling for google maps
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

ready = function() {
  // Resets the map to show the Netherlands
  resetMap();
};

var report_show_position;

/**
  * @desc Initializes the google maps javascript api
  * If geolocation is active go to users current position else center of the map,
  * our the last kown position in the localStorage
*/

function initMap() {
  if ($('#map').length) {
    pos = {lat: lastKownLatitudePosition(), lng: lastKownLongitudePosition()};
    zoom = lastKownZoomLevel();

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
      minZoom: 8,
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

    if (navigator.geolocation && $('.map-show').length === 0) {
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
      map.setZoom(16);

      var sv = new google.maps.StreetViewService();
      sv.getPanorama({location: report_show_position, radius: 50}, processSVData);
    }

    if ($('.map-show').length === 0)  setSearchBar(map);

    // Needed to require the richmarker and infobox file after loading the maps
    initRichMarker();
    initInfoBox();

    // Get the json data for the marker in: markers.js
    getJsonDataForReports(map);

    // Adds event listener to the map on position and zoom change
    changeLastKownPositionAndZoomListener(map);
  }

}

/**
 * @desc Gets back the closes street view position
 * @param {data} data Is the position of the marker and the search radius
 * @param {OK} status Checks if the street view is set
 */

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
 * @desc Sets the authorizedGeoLocation to 1, if geolocation is allowed
 */

function successFunction() {
    localStorage.authorizedGeoLocation = 1;
}

/**
 * @desc Sets the authorizedGeoLocation to 0, if geolocation is not allowed
 */

function errorFunction(){
    localStorage.authorizedGeoLocation = 0;
}

/**
 * @desc Checks if geolocation is authorized
 * @return {boolean} Return true our false for using geolocation
 */

function checkauthorizedGeoLocation(){
  if ( typeof localStorage.authorizedGeoLocation == "undefined" || localStorage.authorizedGeoLocation == "0" ) {
    return false;
  } else {
    return true;
  }
}

/**
 * @desc Checks if there is a last kown latitude position
 * @return {float} Return the last kown latitude position
 */

function lastKownLatitudePosition() {
  if (typeof localStorage.lastLatitudePositionOnMap == 'undefined') {
    localStorage.lastLatitudePositionOnMap = 52.397;
  }
  return parseFloat(localStorage.lastLatitudePositionOnMap);
}

/**
 * @desc Checks if there is a last kown longitude position
 * @return {float} Return the last kown longitude position
 */

function lastKownLongitudePosition() {
  if (typeof localStorage.lastLongitudePositionOnMap == 'undefined') {
    localStorage.lastLongitudePositionOnMap = 5.544;
  }
  return parseFloat(localStorage.lastLongitudePositionOnMap);
}

/**
 * @desc Checks if there is a last kown zoom level
 * @return {float} Return the last kown zoom level
 */

function lastKownZoomLevel() {
  if (typeof localStorage.lastZoomLevel == 'undefined') {
    localStorage.lastZoomLevel = 8;
  }
  return parseFloat(localStorage.lastZoomLevel);
}

/**
 * @desc Changes the last kown position and zoom level in the localStorage
 * @param {element} map The Google maps javascript api
 */

function changeLastKownPositionAndZoomListener(map) {
  if( $('.map-show').length === 0 ) {
    map.addListener('idle', function() {
      localStorage.lastLatitudePositionOnMap = map.getCenter().lat();
      localStorage.lastLongitudePositionOnMap = map.getCenter().lng();
      localStorage.lastZoomLevel = map.getZoom();
    });
  }
}

/**
  * @desc Resets the map to show the Netherlands
*/

function resetMap() {
  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 5.544});
    map.setZoom(8);
  });
}

/**
  * @desc initializes the google maps search bar
  * and sets the new position of the map
  * @param {element} map The Google maps javascript api
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
