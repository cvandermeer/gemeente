var ready;

ready = function() {
  $('.js_current_location').on('click', function() {
    goToCurrentLocation();
  });
};

function goToCurrentLocation() {
  if (localStorage.authorizedGeoLocation == 1) {
    navigator.geolocation.getCurrentPosition(function(geo) {
      pos = {lat: geo.coords.latitude, lng: geo.coords.longitude};
      zoom = 12;
      map.setCenter(pos);
      map.setZoom(zoom);
      if($('.ik-sta-hier').length === 0 ) {
        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: '<div class="ik-sta-hier">Ik sta hier!</div>'
        });
        setTimeout(function() {
          infowindow.close();
        }, 15000);
      }
    });
  } else {
    alert('Huidige locatie voorziening is geblokeerd');
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
