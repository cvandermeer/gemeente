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

function setEvent(boolean, data) {
  var address = ' (' + data.street + ', ' + data.housenumber + ', ' + data.town + ') ' 
  var editLink = '<a class="button js_modal" data-remote="true" href="/events/' + data.id + '/edit">Edit</a>'
  var content = '<a class="event" data-lat="' + data.latitude + '" data-lon= "' + data.longitude + '">' + data.title + '</a>' + address + editLink
  var liContent = '<li data-event-id="' + data.id + '">' + content + '</li>'
  if(boolean) {
    $('.events').find("[data-event-id='" + data.id + "']").html('').append(content)
  } else {
    $('.events').append(liContent)
  }

  // Binding al events to the event, maby there is a better way
  $('.event').bind('click', function(){
    eventClicked(this)
  });
  $('.js_modal').bind('click', function() {
    // Function located in modal_core.js
    initModal()
  });
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    // Function located in modal_core.js
    modalOnAjax(data)
  });

  setMarker(data)
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