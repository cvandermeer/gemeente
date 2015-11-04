var mapStyles = [ {
  featureType:'road',
  elementType:'labels',
  stylers:[
    {visibility:'simplified'},
    {lightness:20}
  ]}, {
  featureType:'administrative.land_parcel',
  elementType:'all',
  stylers:[
    {visibility:'off'}
  ]},{
  featureType:'landscape.man_made',
  elementType:'all',
  stylers:[
    {visibility:'on'}
  ]},{
  featureType:'transit',
  elementType:'all',
  stylers:[
    {saturation:-100},
    {visibility:'on'},
    {lightness:10}
  ]},{
  featureType:'road.local',
  elementType:'all',
  stylers:[
    {visibility:'on'}
  ]},{
  featureType:'road.local',
  elementType:'all',
  stylers:[
    {visibility:'on'}
  ]},{
  featureType:'road.highway',
  elementType:'labels',
  stylers:[
    {visibility:'simplified'}
  ]},{
  featureType:'poi',
  elementType:'labels',
  stylers:[
    {visibility:'off'}
  ]},{
  featureType:'road.arterial',
  elementType:'labels',
  stylers:[
    {visibility:'on'},
    {lightness:50}
  ]},{
  featureType:'water',
  elementType:'all',
  stylers:[
    {hue:'#a1cdfc'},
    {saturation:30},
    {lightness:49}
  ]},{
  featureType:'road.highway',
  elementType:'geometry',
  stylers:[
    {hue:'#f49935'}
  ]},{
  featureType:'road.arterial',
  elementType:'geometry',
  stylers:[
    {hue:'#fad959'}
  ]}, {
  featureType:'road.highway',
  elementType:'all',
  stylers:[
    {hue:'#dddbd7'},
    {saturation:-92},
    {lightness:60},
    {visibility:'on'}
  ]}, {
  featureType:'landscape.natural',
  elementType:'all',
  stylers:[
    {hue:'#c8c6c3'},
    {saturation:-51},
    {lightness:-5},
    {visibility:'on'}
  ]}, {
  featureType:'poi',
  elementType:'all',
  stylers:[
    {hue:'#d9d5cd'},
    {saturation:-70},
    {lightness:20},
    {visibility:'on'}
  ]}
];
var ready;
var map;

var reportElData;

ready = function() {

  // Resets the map on a specific location to show the Netherlands
  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 5.544})
    map.setZoom(8)
  });
}

/**
  * @desc shows the reports when user is filterering on community
  * @return sets the new data to the content container
*/

function communityReports(){
  $('.community-reports').on('ajax:success', function(e, data, status){
    var clat = $(this).parent().attr('data-lat');
    var clon = $(this).parent().attr('data-lon');
    map.setCenter({lat: parseFloat(clat), lng: parseFloat(clon)});
    map.setZoom(13);
    $('.wrapper .content').html(data);
    removeModal()
    if ($('.show-side-menu').length) {
      $('.outer-wrapper, .side-menu').removeClass('show-side-menu');
      $('.hamburger').removeClass('active');
    }
  });
}

/**
  * @desc initializes the google maps javascript api
  * @return if geolocation is active go to users current position else center of the map
*/

function initMap() {
  // Function can be found in reports_map.js
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: pos,
      styles: mapStyles,
      mapTypeControlOptions: {
         position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      scrollwheel: false,
      zoomControl: true,
      zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_TOP
      },
      draggable: true
    });

    var infowindow = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'U staat hier!'
    });

    // Sets street view
    // setPanorama(pos);
    if ($('.details-wrapper').length == 0) {
      getMarkers()
      setSearchBar(map)
      checkLonLatBounds(map);
    }
  }, function (error) {
    if (error.code == error.PERMISSION_DENIED) {
      center = {lat: 52.397, lng: 5.544}
      zoom = 8

      if($('.community-data').length){
        var community_position = {lat: parseFloat($('.community-data').attr('data-lat')), lng: parseFloat($('.community-data').attr('data-lon'))}
        zoom = 10
        center = community_position
      }
    }
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      styles: mapStyles,
      mapTypeControlOptions: {
         position: google.maps.ControlPosition.RIGHT_TOP
      },
      zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      scrollwheel: false,
      zoomControl: true,
      zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_TOP
      },
      draggable: true
    });

    if ($('.details-wrapper').length == 0) {
      getMarkers()
      setSearchBar(map)
      checkLonLatBounds(map);
    }
  });
}

/**
  * @desc initializes the google maps search bar
  * @param function map - google maps javascript api
  * @return the new position of the location searched
*/

function setSearchBar(map) {
  // Search bar with autocomplete
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

/**
  * @desc checks if the reports are in the map bounds
  * @param function map - google maps javascript api
  * @return show our hides reports if they are in the current maps bounds
*/

function checkLonLatBounds(map){
  map.addListener('bounds_changed', function(bounds) {
    var maxlat = map.getBounds().getNorthEast().lat();
    var minlat = map.getBounds().getSouthWest().lat();
    var minlon = map.getBounds().getSouthWest().lng();
    var maxlon = map.getBounds().getNorthEast().lng();
    $('.report').each(function() {
      var el = $(this);
      if($(el).attr('data-lat') < minlat | $(el).attr('data-lat') > maxlat | $(el).attr('data-lon') < minlon | $(el).attr('data-lon') > maxlon){
        $(el).closest('.report-show').hide();
      }else{
        $(el).closest('.report-show').show();
      }
    });
  });
}

/**
  * @desc when new report is added go to the location
  * @param element el - stants for this
  * @return a new location in de goolge maps api
*/

function goToReportLocation(el) {
  var clicked_position = {lat: parseFloat($(el).attr('data-lat')), lng: parseFloat($(el).attr('data-lon'))}
  map.setCenter(clicked_position)
  map.setZoom(17)
  // setPanorama(clicked_position)
}

/**
  * @desc get all reports from show
  * @return each report value in a setMarker function
*/

function getMarkers() {
  $('.reports li').each(function() {
    var el = $(this).find('.report')
    setMarker(parseFloat($(el).attr('data-lat')), parseFloat($(el).attr('data-lon')), el[0].innerText, $(el).attr('data-id'))
  });
}

/**
  * @desc sets all markers in the google maps api
  * @param float lat - latitude of the report position
  * @param float lon - longitude of the report position
  * @param string title - the title of the report
  * @param integer id - the id of the report
  * @return a onclick function to open the infoWindow
*/

function setMarker(lat, lon, title, id) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat,lon),
    title: title,
    id: id
  });

  marker.setMap(map);

  google.maps.event.addListener(marker, 'click', function() {
    setInfoWindow(this)
  });
}

/**
  * @desc gets the data for the info window through ajax
  * @param element el - stants for this
  * @return if ajax success return the data in a info window
*/

function setInfoWindow(el) {
  $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + el.id + "/info_window",
    success: function(data){
      setInfoVal(data, el)
    }
  });
}

/**
  * @desc sets the data for the info window
  * @param string data - contains the show of reports/info_window
  * @param element el - stants for this
  * @return opens the infor window
*/

function setInfoVal(data, el) {
  var content = data
  var id = $(el)[0].id
  var infowindow = new google.maps.InfoWindow({
      id: id,
      content: content
  });
  infowindow.open(map,el);
}

/**
  * @desc sets the street view
  * @param function position - return back the position of the google maps api
  * @return a new street view position
*/

function setPanorama(position) {
  var panorama = new google.maps.StreetViewPanorama(
  document.getElementById('pano'), {
    position: position,
    pov: {
      heading: 34,
      pitch: 10
    }
  });
  map.setStreetView(panorama);
}

/**
  * @desc sets the data in the modal
  * @return the new/edit report in the document
*/

function newReportForm() {
  $('.modal form.new_report, .modal form.edit_report').bind('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      data = data.replace(/\\n/g, '').replace(/\\/g, '').substring(1)
      data = data.substring(0, data.length - 2);
      $('.reports').append(data);

      var el = $('.reports li:last-child .report')
      if ($('.reports').find("[data-id='" + el.attr('data-id') + "']").length > 1) {
        $('.reports li').last().remove()
        $('.reports').find("[data-id='" + el.attr('data-id') + "']").parent().before(data).remove()
      }
      removeModal();
      setMarker(parseFloat(el.attr('data-lat')), parseFloat(el.attr('data-lon')), el.attr('data-title'), $(el).attr('data-id'))
      goToReportLocation(el)
      bindHandlers()
    } else {
      $('.modal-content').html(data)
      newReportForm()
    }
  });
}

/**
  * @desc binds the ajax success function
*/

function bindHandlers() {
  $('.report').bind('ajax:success', function(e, data, status) {
    showReport(data, this)
  });
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data)
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
