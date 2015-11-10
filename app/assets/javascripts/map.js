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

var pos;
var zoom;

//var google;

ready = function() {
  resetMap();
}

/**
  * @desc initializes the google maps javascript api
  * @return if geolocation is active go to users current position else center of the map
*/

function initMap() {
  pos = {lat: 52.397, lng: 5.544};
  zoom = 8;

  if($('.community-data').length){
    pos = {lat: parseFloat($('.community-data').attr('data-lat')), lng: parseFloat($('.community-data').attr('data-lon'))}
    zoom = 10
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: pos,
    styles: mapStyles,
    disableDefaultUI: true,
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

  navigator.geolocation.getCurrentPosition(function(geo) {
    pos = {lat: geo.coords.latitude, lng: geo.coords.longitude}
    zoom = 12
    map.setCenter(pos)
    map.setZoom(zoom)
    var infowindow = new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: 'U staat hier!'
    });
  });



  // markers.js
  getJsonDataForReports(map)

}

/**
  * @desc resets the map
  * @return on a specific location to show the Netherlands
*/

function resetMap() {
  $('.reset-map').on('click', function(){
    map.setCenter(pos)
    map.setZoom(zoom)
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
