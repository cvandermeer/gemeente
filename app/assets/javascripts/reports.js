var streetValInput = '';
var townValInput = '';
var oldStreetValInput = '';
var oldTownValInput = '';

function bindReportFormResponse() {
  // Binds the functions to the form
  triggerAutocomplete();
  setNewMarkerOnStreetAndTownGeoLocation();

  $('.report-modal form').bind("ajax:success", function(e, data){
    if(data !== null && typeof data === 'object') {
      goToReportLocation(data);
      removeHeaderModal($('.header-modal'));
    } else {
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
    //console.log(streetValInput, oldStreetValInput)
    console.log(streetValInput != oldStreetValInput || townValInput != oldTownValInput);
    if(streetValInput != oldStreetValInput || townValInput != oldTownValInput) {
      if(streetValInput.length >= 3 && townValInput.length >= 3) {
        var geocoder = new google.maps.Geocoder();
        var address = streetValInput + townValInput;
        geocoder.geocode( { 'address': address}, function(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            setNewMarkerOnMap(latitude, longitude);
            var pos = {lat: latitude, lng: longitude};
            map.setCenter(pos);
          }
        });
        oldStreetValInput = streetValInput;
        console.log(oldStreetValInput)
        oldTownValInput = townValInput;
      }
    } else {
      console.log('The input values did not changed');
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
      flat: true
    };

    var marker = new RichMarker(markerOptions);
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
