var ready;

var eventElData;

ready = function() {

  $('.event').on('click', function(){
    eventClicked(this)
  });

  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 5.544})
    map.setZoom(7)
  });
}

function eventClicked(el) {
  map.setCenter({lat: parseFloat($(el).attr('data-lat')), lng: parseFloat($(el).attr('data-lon'))})
  map.setZoom(17)
}

function getMarkers() {
  $('.events li').each(function() {
    var el = $(this).find('.event')
    setMarker(parseFloat($(el).attr('data-lat')), parseFloat($(el).attr('data-lon')), el[0].innerText)
  });
}

function setMarker(lat, lon, title) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat,lon),
    title: title
  });
  marker.setMap(map);
}

function newEventForm() {
  $('.modal form').bind('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      $('.events').append(data);
      if ($('.events').find("[data-event-id='" + eventElData.id + "']").length > 1) {
        $('.events li').last().remove()
        $('.events').find("[data-event-id='" + eventElData.id + "']").before(data).remove()
      }
      removeModal();
      setMarker(eventElData.latitude, eventElData.longitude, eventElData.title)
      bindHandlers()
    } else {
      $('.modal-content').html(data)
      newEventForm()
    }
  });
}

function bindHandlers() {
  $('.event').bind('click', function(){
    eventClicked(this)
  });
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data)
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);