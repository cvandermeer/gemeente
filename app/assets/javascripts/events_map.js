var ready;

ready = function() {

  $('.event').on('click', function(){
    eventClicked(this)
  });

  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 6.544})
    map.setZoom(7)
  });

  $('.new_event').on('ajax:success', function(e, data, status, xhr){
    alert('yes');
    $('.events').append(xhr.responseText);
  });
}

function eventClicked(el) {
  var lat = parseFloat($(el).attr('data-lat'))
  var lon = parseFloat($(el).attr('data-lon'))
  map.setCenter({lat: lat, lng: lon})
  map.setZoom(17)
}

function setMarker(el) {
  var lat = el.latitude
  var lon = el.longitude
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat,lon),
    title: el.title
  });
  marker.setMap(map);
}

$(document).ready(ready);
$(document).on('page:load', ready);