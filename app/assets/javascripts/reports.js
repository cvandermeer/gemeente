var streetValInput = '';
var townValInput = '';
var oldStreetValInput = '';
var oldTownValInput = '';
var newMarker;

function bindReportFormResponse() {
  // Binds the functions to the form
  triggerAutocomplete();
  setNewMarkerOnStreetAndTownGeoLocation();

  $('.report-modal form').bind("ajax:success", function(e, data){
    if(data !== null && typeof data === 'object') {
      goToReportLocation(data);
      removeHeaderModal($('.header-modal'));
      removeOldNewMarker();
    }  else {
      $('.report-modal form').html(data);

      triggerAutocomplete();

      bindReportFormResponse();

      setNewMarkerOnStreetAndTownGeoLocation();
    }
  });
}

function setNewMarkerOnStreetAndTownGeoLocation() {
  $('.js_street_input').on('change, focusout', function(){
    streetValInput = $('.js_street_input').val();
  });

  $('.js_town_input').on('change, focusout', function() {
    townValInput = $('.js_town_input').val();
  });

  $('.js_street_input, .js_town_input').on('focusout', function(){
    if (streetValInput != oldStreetValInput || townValInput != oldTownValInput) {
      if (streetValInput.length >= 3 && townValInput.length >= 3) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': streetValInput + townValInput}, function(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            if ($('.new-marker').length !== 0) {
              removeOldNewMarker();
            }
            setNewMarkerOnMap(latitude, longitude);
            setLatitudeAndLongitudeInForm(latitude, longitude);
            addListenerToNewMarkerOnPositionChange(geocoder);
            map.setCenter({lat: latitude, lng: longitude});
          }
        });
        oldStreetValInput = streetValInput;
        oldTownValInput = townValInput;
      }
    }
  });
}

function setNewMarkerOnMap(latitude, longitude) {
  var markerContent =
                    '<div class="marker">' +
                        '<div class="marker-icon new-marker">' +
                        '</div>' +
                    '</div>';

    var markerOptions = {
      position: new google.maps.LatLng( latitude, longitude ),
      map: map,
      draggable: true,
      content: markerContent,
      flat: true,
      zIndex: 999
    };

    newMarker = new RichMarker(markerOptions);
}

function removeOldNewMarker() {
  newMarker.onRemove();
}

function setLatitudeAndLongitudeInForm(lat, lng) {
  $('.js_latitude_input').val(lat);
  $('.js_longitude_input').val(lng);
}

var timer;

function addListenerToNewMarkerOnPositionChange(geocoder) {
  google.maps.event.addListener(newMarker, 'position_changed', function() {
    clearInterval(timer);
    timer = setTimeout(function(){

      var lat = newMarker.getPosition().lat();
      var lng = newMarker.getPosition().lng();
      setLatitudeAndLongitudeInForm(lat, lng);
      setNewStreetAndTownInForm(geocoder, lat, lng);
    }, 1000);
  });
}

function setNewStreetAndTownInForm(geocoder, lat, lng) {
  var latLng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latLng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var result = results[0];

      var street = "";
      var street_number = "";
      var town = "";

      for(var i=0, len=result.address_components.length; i<len; i++) {
      	var ac = result.address_components[i];
      	if(ac.types.indexOf("route") >= 0) street = ac.long_name;
        if(ac.types.indexOf('street_number') >= 0) street_number = ac.long_name;
      	if(ac.types.indexOf("locality") >= 0) town = ac.long_name;
      }

      if(town !== '' && street !== '') {
        var address = '';
        if(street_number !== '') {
          address = street  + " " + street_number;
        } else {
          address = street;
        }
        $('.js_street_input').val(address);
        $('.js_town_input').val(town);
      }
    }
  });
}

/**
  * @desc when new report is added go to the location
  * @param element el - stants for this
  * @return a new location in de goolge maps api
*/

function goToReportLocation(data) {
  var position = {lat: data.latitude, lng: data.longitude};
  map.setCenter(position);
  map.setZoom(15);
}

function communityReports(){
  $('.community-reports').on('ajax:success', function(e, data, status){
    var clat = $(this).parent().attr('data-lat');
    var clon = $(this).parent().attr('data-lon');
    map.setCenter({lat: parseFloat(clat), lng: parseFloat(clon)});
    map.setZoom(13);
    $('.wrapper .content').html(data);
    removeModal();
    if ($('.show-side-menu').length) {
      $('.outer-wrapper, .side-menu').removeClass('show-side-menu');
      $('.hamburger').removeClass('active');
    }
  });
}

$(function() {
  $('select#report_status').change(function(){
    $(this).parent().submit();
  });
});

// Old Functions

/*
function getReportIndex(data) {
  $('ul.reports').html(' ');
  for (var i = 0; i < data.length; i++)  {
    fetchReport(data[i]);
  }
}

function fetchReport(data) {
  $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + data.id + "/report_index",
    success: function(data){
      setReportIndex(data);
    }
  });
}

function setReportIndex(data) {
  $('ul.reports').append(data);
  bindReportHandlers();
  bindHoverToReport();
}

function bindReportHandlers() {
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data);
  });
}

function bindHoverToReport() {
  $('.reports li').hover(function() {
    $('.marker[data-marker-id="'+$(this).attr('data-reports-id')+'"]').addClass('active');
  }, function() {
    $('.marker[data-marker-id="'+$(this).attr('data-reports-id')+'"]').removeClass('active');
  });
}*/
