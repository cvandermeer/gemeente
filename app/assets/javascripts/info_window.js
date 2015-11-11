function fetchInfoWindow(el) {
  return $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + el.id + "/info_window",
    success: function(data){
      handleInfoWindowData(data, el);
    }
  });
}

function handleInfoWindowData(data, el) {
  var infoboxOptions = {
      content: data,
      disableAutoPan: false,
      pixelOffset: new google.maps.Size(-18, -42),
      zIndex: null,
      alignBottom: true,
      boxClass: "infobox",
      enableEventPropagation: true,
      closeBoxMargin: "0px 0px -30px 0px",
      closeBoxURL: "assets/img/close.png",
      infoBoxClearance: new google.maps.Size(1, 1)
  };
  $('.info-box').remove();
  el.infobox = new InfoBox(infoboxOptions);
  el.infobox.open(map, el);
}
