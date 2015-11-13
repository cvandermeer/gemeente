function fetchInfoWindow(el, i) {
  return $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + el.id + "/info_window",
    success: function(data){
      handleInfoWindowData(data, el, i);
    }
  });
}

function handleInfoWindowData(data, el, i) {
  var infoboxOptions = {
      content: data,
      disableAutoPan: false,
      pixelOffset: new google.maps.Size(-18, -42),
      zIndex: 999,
      alignBottom: true,
      boxClass: "infobox",
      enableEventPropagation: true,
      closeBoxMargin: "0px 0px -30px 0px",
      closeBoxURL: "assets/img/close.png",
      infoBoxClearance: new google.maps.Size(1, 1)
  };
  $('.infobox').remove();
  el.infobox = new InfoBox(infoboxOptions);
  el.infobox.open(map, el);
  bindInfoBoxHandlers(map, el, i);
}

function bindInfoBoxHandlers(map, el, i) {
  setTimeout(function() {
    $(document).find('.close').on('click', function() {
      el.infobox.close(map, el);
      lastClicked = false;
      el.content.className = ' ';
    });
  }, 300);
}
