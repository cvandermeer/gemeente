var ready;
ready = function() {

  $('.event').on('click', function(){
    eventClicked(this)
  });

  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 6.544})
    map.setZoom(7)
  });

}

function eventClicked(el) {
  var lat = parseFloat($(el).attr('data-lat'))
  var lon = parseFloat($(el).attr('data-lon'))
  map.setCenter({lat: lat, lng: lon})
  map.setZoom(17)
}

function setEvent(data) {
  var text = data.title + ' (' + data.street + ', ' + data.housenumber + ', ' + data.town + ')'
  var content = '<li class="event" data-lat="' + data.latitude + '" data-lon= "' + data.longitude + '">' + text + '</li>'
  $('.events').append(content)
  $('.event').bind('click', function(){
    eventClicked(this)
  });
  setMarker(data)
}

function setMarker(el) {
  var lat = el.latitude
  var lon = el.longitude
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat,lon),
    title: '<%= event.title.to_s %>'
  });
  marker.setMap(map);
}

$(document).ready(ready);
$(document).on('page:load', ready);