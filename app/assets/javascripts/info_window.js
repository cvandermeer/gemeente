/**
 * @desc Gets the data for the info window on the map
 * @param {element} el Is the current marker
 * @param {number} i The index number of the for loop in markers.js
 * @return {data} initializes the handleInfoWindowData function
 */

function fetchInfoWindow(el, i) {
  return $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + el.id + "/info_window",
    success: function(data){
      // handels the data for the info window
      handleInfoWindowData(data, el, i);
    }
  });
}

/**
 * @desc Sets the data to the map and opens a info window
 * @param {html} data The html for the info window
 * @param {element} el Is the current marker
 * @param {number} i The index number of the for loop in markers.js
 */

function handleInfoWindowData(data, el, i) {
  // Sets the options for the info window
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
  // Sets the info box to the marker and opens if
  el.infobox = new InfoBox(infoboxOptions);
  el.infobox.open(map, el);
  bindInfoBoxHandlers(map, el, i);
}

/**
 * @desc Binds the click functions of the info window
 * @param {element} map Is google maps
 * @param {element} el Is the current marker
 * @param {number} i The index number of the for loop in markers.js
 */

function bindInfoBoxHandlers(map, el, i) {
  setTimeout(function() {
    $(document).find('.close').on('click', function() {
      el.infobox.close(map, el);
      lastClicked = false;
      el.content.className = ' ';
    });
  }, 300);
}

/**
 * @desc Finds and closes the info window, if info-box present
 */

function findAndCloseInfoBox() {
  if($('.info-box').length) {
    $('.info-box .close').trigger('click');
  }
}
