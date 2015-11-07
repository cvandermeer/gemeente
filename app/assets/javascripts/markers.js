
/**
  * @desc gets back the map bounds
  * @return json data of reports, with the map bounds
*/

function getJsonDataForReports(map) {
  map.addListener('bounds_changed', function() {
    var minlat = map.getBounds().getSouthWest().lat();
    var maxlat = map.getBounds().getNorthEast().lat();
    var minlng = map.getBounds().getSouthWest().lng();
    var maxlng = map.getBounds().getNorthEast().lng();
    var km = getDistanceFromLatLonInKm(minlat, minlng, maxlat, maxlng)

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "/set_makers",
      //data: {'lat': map.getCenter().lat(), 'lng': map.getCenter().lng(), 'km': km},
      success: function(data){

      }
    });

  });
}

/**
  * @desc calculates the distances
  * @param floats, latitude and longitude
  * @return the distances of the map bounds
*/

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
