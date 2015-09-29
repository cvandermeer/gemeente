var ready;
var map;

var reportElData;

ready = function() {

  $('.report').on('click', function(){
    reportClicked(this)
  });

  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 5.544})
    map.setZoom(7)
  });

}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.397, lng: 5.544},
    zoom: 7
  });

  // Function can be found in reports_map.js
  getMarkers()
  setGeoLocation()

  // Search bar with autocomplete
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
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

function reportClicked(el) {
  map.setCenter({lat: parseFloat($(el).attr('data-lat')), lng: parseFloat($(el).attr('data-lon'))})
  map.setZoom(17)
}

function getMarkers() {
  $('.reports li').each(function() {
    var el = $(this).find('.report')
    setMarker(parseFloat($(el).attr('data-lat')), parseFloat($(el).attr('data-lon')), el[0].innerText)
  });
}

function setMarker(lat, lon, title) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat,lon),
    title: title
  });

  var infowindow = new google.maps.InfoWindow({
    content: title
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  marker.setMap(map);
}

function setGeoLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'U staat hier!'
      });
      map.setCenter(pos);
      map.setZoom(12);
    });
  }
}

function newReportForm() {
  $('.modal form').bind('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      $('.reports').append(data);
      var el = $('.reports li:last-child .report')
      if ($('.reports').find("[data-report-id='" + el.attr('data-id') + "']").length > 1) {
        $('.reports li').last().remove()
        $('.reports').find("[data-report-id='" + el.attr('data-id') + "']").before(data).remove()
      }
      removeModal();
      setMarker(parseFloat(el.attr('data-lat')), parseFloat(el.attr('data-lon')), el.attr('data-title'))
      bindHandlers()
    } else {
      $('.modal-content').html(data)
      newReportForm()
    }
  });
}

function bindHandlers() {
  $('.report').bind('click', function(){
    reportClicked(this)
  });
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data)
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);