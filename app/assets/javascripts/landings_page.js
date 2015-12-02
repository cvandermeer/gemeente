var ready;

ready = function() {
  if($('.landing-outer-wrapper').length) {
    addActiveToTopMarker();
  }
};

function addActiveToTopMarker(){
  setTimeout(function() {
    $('.top-marker').addClass('active');
  }, 1000);
}

$(document).ready(ready);
$(document).on('page:load', ready);
