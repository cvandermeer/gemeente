var ready;
ready = function() {

  $('.event').on('click', function(){
    var view = map.getView();
    var lon = parseFloat($(this).attr('data-lon'));
    var lat = parseFloat($(this).attr('data-lat'));
    view.setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    view.setZoom(17);
  });

  $('.reset_map').on('click', function(){
    var view = map.getView();
    view.setCenter(ol.proj.transform([5.7, 52.2], 'EPSG:4326', 'EPSG:3857'));
    view.setZoom(7);
  });

}

$(document).ready(ready);
$(document).on('page:load', ready);