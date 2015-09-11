var ready;
ready = function() {

  $('.event').on('click', function(){
    var lat = parseFloat($(this).attr('data-lat'))
    var lon = parseFloat($(this).attr('data-lon'))
    map.setCenter({lat: lat, lng: lon})
    map.setZoom(17)
  });

  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 6.544})
    map.setZoom(7)
  });

}

$(document).ready(ready);
$(document).on('page:load', ready);