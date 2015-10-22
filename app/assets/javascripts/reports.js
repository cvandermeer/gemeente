var ready;
var map;

var reportElData;

ready = function() {

  $('.report').on('click', function(){
    goToReportLocation(this)
  });

  $('.report').on('ajax:success', function(e, data, status) {
    showReport(data, this)
  });

  $('.reset-map').on('click', function(){
    map.setCenter({lat: 52.397, lng: 5.544})
    map.setZoom(7)
  });
}

function communityReports(){
  $('.community-reports').on('ajax:success', function(e, data, status){
    var clat = $(this).parent().attr('data-lat');
    var clon = $(this).parent().attr('data-lon');
    map.setCenter({lat: parseFloat(clat), lng: parseFloat(clon)});
    map.setZoom(10);
    $('.content-container').html(data);
    removeModal()
  });
}

function showReport(data, el) {
  $(el).unbind('ajax:success')
  $(el).parent().append(data)
  var set_height = $(el).parent().find('.row').height()
  $(el).parent().find('.row').css('height', '1px')
  setTimeout(function() {
    $(el).parent().find('.row').css('height', set_height + 'px')
  }, 100)
  $(el).parent().find('.js_close_report_show').bind('click', function() {
    closeShowReport(this)
  })
}

function closeShowReport(el) {
  $(el).parent().css('height', '1px')
  $(el).parent().parent().find('.report').bind('ajax:success', function(e, data, status){
    showReport(data, this)
  })
  setTimeout(function() {
    $(el).parent().remove()
  }, 300)
}


function initMap() {
  // Function can be found in reports_map.js
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: pos
    });

    var infowindow = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'U staat hier!'
    });

    setPanorama(pos);

    getMarkers()
    setSearchBar(map)
    checkLonLatBounds(map);

  }, function (error) {
    if (error.code == error.PERMISSION_DENIED) {
      center = {lat: 52.397, lng: 5.544}
      zoom = 7

      if($('.community-data').length){
        var community_position = {lat: parseFloat($('.community-data').attr('data-lat')), lng: parseFloat($('.community-data').attr('data-lon'))}
        zoom = 10
        center = community_position
      }
    }
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom
    });

    getMarkers()
    setSearchBar(map)
    checkLonLatBounds(map);
  });
}

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

function checkLonLatBounds(map){
  map.addListener('bounds_changed', function(bounds) {
    var maxlat = map.getBounds().getNorthEast().lat();
    var minlat = map.getBounds().getSouthWest().lat();
    var minlon = map.getBounds().getSouthWest().lng();
    var maxlon = map.getBounds().getNorthEast().lng();
    $('.report').each(function() {
      var el = $(this);
      if($(el).attr('data-lat') < minlat | $(el).attr('data-lat') > maxlat | $(el).attr('data-lon') < minlon | $(el).attr('data-lon') > maxlon){
        $(el).parent().hide();
      }else{
        $(el).parent().show();
      }
    });
  });
}

function goToReportLocation(el) {
  var clicked_position = {lat: parseFloat($(el).attr('data-lat')), lng: parseFloat($(el).attr('data-lon'))}
  map.setCenter(clicked_position)
  map.setZoom(17)
  setPanorama(clicked_position)
}

function getMarkers() {
  $('.reports li').each(function() {
    var el = $(this).find('.report')
    setMarker(parseFloat($(el).attr('data-lat')), parseFloat($(el).attr('data-lon')), el[0].innerText, $(el).attr('data-id'))
  });
}

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

function setInfoVal(data, el) {
  var content = data
  var id = $(el)[0].id
  var infowindow = new google.maps.InfoWindow({
      id: id,
      content: content
  });
  infowindow.open(map,el);
}

function setGeoLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'U staat hier!'
      });
      map.setCenter(pos);
      map.setZoom(12);
      setPanorama(pos);
    });

  }
}

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

function newReportForm() {
  $('.modal form').bind('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      $('.reports').append(data);
      var el = $('.reports li:last-child .report')
      if ($('.reports').find("[data-report-id='" + el.attr('data-id') + "']").length > 1) {
        $('.reports li').last().remove()
        $('.reports').find("[data-report-id='" + el.attr('data-id') + "']").before(data).remove()
      }
      removeModal();
      setMarker(parseFloat(el.attr('data-lat')), parseFloat(el.attr('data-lon')), el.attr('data-title'))
      goToReportLocation(el)
      bindHandlers()
    } else {
      $('.modal-content').html(data)
      newReportForm()
    }
  });
}

function bindHandlers() {
  $('.report').bind('click', function(){
    goToReportLocation(this)
  });
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data)
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
