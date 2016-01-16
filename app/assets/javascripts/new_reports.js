var ready;

ready = function() {
  // On change status of report submit status form
  $('select#report_status').change(function(){
    $(this).parent().submit();
  });
};

var streetValInput = '';
var townValInput = '';
var oldStreetValInput = '';
var oldTownValInput = '';
var newMarker;
var clickListenerForNewMarkerHandle;
var geocoder;
var validate;

/**
 * @desc Binds the form response to new report
 * @param {string} type Checks if it is a new form
 */

function bindReportFormResponse(type) {
  geocoder = new google.maps.Geocoder();

  // Triggers the autocomplete for the street and town input in: autocomplete.js
  triggerAutocomplete();

  // Sets the new marker bases on the street and town input values
  setNewMarkerOnStreetAndTownGeoLocation();

  // If the form is for a new report it binds the on click map, to add a marker
  if(type === 'new') setNewMarkerOnMapClicked();

  // Sets the validation for the reports form
  setupValidation();

  //triggerLoading();
}

/**
 * @desc Sets a new marker in the map based on the town and street input value,
 * uses geocoder to get the right latitude and longitude position
 */

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

/**
 * @desc Sets a new draggable marker on the map
 * @param {float} latitude Is the latitude position of the marker
 * @param {float} longitude Is the longitude position of the marker
 */

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

    // Adds the latitude and longitude values to the form
    setLatitudeAndLongitudeInForm(latitude, longitude);

    // Adds listener to marker if position changes by dragging
    addListenerToNewMarkerOnPositionChange();
}

/**
 * @desc Removes the new marker from the map
 */

function removeOldNewMarker() {
  newMarker.onRemove();
  map.setOptions({draggableCursor:''});
  google.maps.event.removeListener(clickListenerForNewMarkerHandle);
}

/**
 * @desc Sets the latitude and longitude values to the report form
 * @param {float} lat Is the latitude position
 * @param {float} long Is the longitude position
 */

function setLatitudeAndLongitudeInForm(lat, lng) {
  $('.js_latitude_input').val(lat);
  $('.js_longitude_input').val(lng);
}

var timer;

/**
 * @desc Adds listener to marker if position changes by dragging
 */

function addListenerToNewMarkerOnPositionChange() {
  google.maps.event.addListener(newMarker, 'position_changed', function() {
    clearInterval(timer);
    timer = setTimeout(function(){

      var lat = newMarker.getPosition().lat();
      var lng = newMarker.getPosition().lng();

      // Sets the latitude and longitude value in the form
      setLatitudeAndLongitudeInForm(lat, lng);

      // Sets the street and town value in the form
      setNewStreetAndTownInForm(lat, lng, true);
    }, 300);
  });
}

/**
 * @desc Sets the new street and town value in the form based on geocoder
 * And sets the community name based on geocoder
 * @param {float} lat Is the latitude position
 * @param {float} long Is the longitude position
 * @param {boolean} setAlsoStreetAndTown If true it sets the value of the street and town
 */

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

/**
 * @desc Sets a marker if the map is click and there is no new marker present
 */

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

/**
 * @desc Sets the value of the community name
 * @param {string} communityName Is the name of the current community
 */

function setCommunityIdToReport(communityName) {
  if(communityName !== '') {
    if(communityName !== $('.js_community_name').val()) {
      $('.js_community_name').val(communityName);
    }
  }
}

/**
 * @desc Sets the validations for the reports form
 */

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
 * @desc when new report is added go to its location,
 * this function is called from /views/reports/create.js
 * @param {json} data Is the reports json data of the new report
 */

function goToReportLocation(data) {
  var position = {lat: data.latitude, lng: data.longitude};
  map.setCenter(position);
}

/**
 * @desc Sets the map center of the community based on the latitude and longitude
 */

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

$(document).ready(ready);
$(document).on('page:load', ready);
