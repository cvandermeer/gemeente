var streetValInput = '';
var townValInput = '';
var oldStreetValInput = '';
var oldTownValInput = '';
var newMarker;
var clickListenerForNewMarkerHandle;
var geocoder;
var validate;

function bindReportFormResponse() {
  // Binds the functions to the form
  geocoder = new google.maps.Geocoder();

  triggerAutocomplete();
  setNewMarkerOnStreetAndTownGeoLocation();
  setNewMarkerOnMapClicked();
  setupValidation();
  //triggerLoading();

  $('.contact-modal form').on('ajax:success', function(e, data){
    removeHeaderModal($('.header-modal'));
    setNotice('Uw melding is ontvangen')
  });

  $('.report-modal form').on("ajax:success", function(e, data){
    if(data !== null && typeof data === 'object') {
      goToReportLocation(data);
      removeHeaderModal($('.header-modal'));
      removeOldNewMarker();
      setNotice('Uw melding is ontvangen: ' + data.title);
    }  else if(data.indexOf('form') > 0) {
      $('.report-modal form').html(data);

      google.maps.event.removeListener(clickListenerForNewMarkerHandle);

      triggerAutocomplete();
      triggerLoading();
      setNewMarkerOnMapClicked();
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
        geocoder.geocode( { 'address': streetValInput + townValInput}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            if ($('.new-marker').length !== 0) {
              removeOldNewMarker();
            }
            setNewMarkerOnMap(latitude, longitude);
            map.setCenter({lat: latitude, lng: longitude});
            setNewStreetAndTownInForm(latitude, longitude, false);

          } else {
            if($('.location-not-found').length === 0) {
              $('.js_street_input').parent().before('<div class="location-not-found">Locatie klopt niet! ' +
              'Klik op de map voor het vinden van de juiste locatie</div>');
            }
          }
        });
        oldStreetValInput = streetValInput;
        oldTownValInput = townValInput;
      }
    }
  });
}

function setNewMarkerOnMap(latitude, longitude) {
  //newMarker = '';
  var markerContent =
                    '<div class="marker new-marker">' +
                        '<div class="marker-icon">' +
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
    map.setOptions({draggableCursor:''});

    setLatitudeAndLongitudeInForm(latitude, longitude);
    addListenerToNewMarkerOnPositionChange();
}

function removeOldNewMarker() {
  newMarker.onRemove();
  map.setOptions({draggableCursor:''});
  google.maps.event.removeListener(clickListenerForNewMarkerHandle);
}

function setLatitudeAndLongitudeInForm(lat, lng) {
  $('.js_latitude_input').val(lat);
  $('.js_longitude_input').val(lng);
}

var timer;

function addListenerToNewMarkerOnPositionChange() {
  google.maps.event.addListener(newMarker, 'position_changed', function() {
    clearInterval(timer);
    timer = setTimeout(function(){

      var lat = newMarker.getPosition().lat();
      var lng = newMarker.getPosition().lng();
      setLatitudeAndLongitudeInForm(lat, lng);
      setNewStreetAndTownInForm(lat, lng, true);
    }, 1000);
  });
}

function setNewStreetAndTownInForm(lat, lng, setAlsoStreetAndTown) {
  var latLng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latLng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var result = results[0];

      var street = "";
      var street_number = "";
      var town = "";

      var communityName = "";

      for(var i=0, len=result.address_components.length; i<len; i++) {
      	var ac = result.address_components[i];
      	if(ac.types.indexOf("route") >= 0) street = ac.long_name;
        if(ac.types.indexOf('street_number') >= 0) street_number = ac.long_name;
      	if(ac.types.indexOf("locality") >= 0) town = ac.long_name;
        if(ac.types.indexOf("administrative_area_level_2") >= 0) communityName = ac.long_name;
      }

      if(town !== '' && street !== '') {
        var address = '';
        if(street_number !== '') {
          address = street  + " " + street_number;
        } else {
          address = street;
        }

        if (setAlsoStreetAndTown) {
          $('.js_street_input').val(address);
          validate.checkValidRequired(0);
          validate.setClass(0);
          $('.js_town_input').val(town);
          validate.checkValidRequired(1);
          validate.setClass(1);
        }
      }

      setCommunityIdToReport(communityName);
    }
  });
  if($('.location-not-found').length !== 0) {
    $('.location-not-found').remove();
  }
}


function setNewMarkerOnMapClicked() {
  if($('.new-marker').length === 0) {
    map.setOptions({draggableCursor:'copy'});
    clickListenerForNewMarkerHandle = map.addListener('click', function(e) {
      if($('.new-marker').length === 0) {
        var lat = e.latLng.lat();
        var lng = e.latLng.lng();
        setNewMarkerOnMap(lat, lng);
        setNewStreetAndTownInForm(lat, lng, true);
      }
    });
  }
}

function setCommunityIdToReport(communityName) {
  if(communityName !== '') {
    if(communityName !== $('.js_community_name').val()) {
      $('.js_community_name').val(communityName);
    }
  }
}

function setupValidation() {
  var validateOptions = {
    form: $('.validate'),
    msg_compare: 'Zorg ervoor dat de waardes gelijk zijn',
    msg_email: 'Gebruik een juist email adres',
    msg_min_length: 'Minimaal aantal tekens: ',
    msg_required: 'Dit veld is verplicht'
  };

  validate = new Validate(validateOptions);
}

/**
  * @desc when new report is added go to the location
  * @param element el - stants for this
  * @return a new location in de goolge maps api
*/

function goToReportLocation(data) {
  var position = {lat: data.latitude, lng: data.longitude};
  map.setCenter(position);
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

var ready;

ready = function() {
  $('select#report_status').change(function(){
    $(this).parent().submit();
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
