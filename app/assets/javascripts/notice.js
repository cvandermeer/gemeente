var ready;

ready = function() {

  if( $('.notice, .alert').length ) {
    $('.notice, .alert').addClass('active');
    setTimeout(function() {
      $('.notice, .alert').removeClass('active');
    }, 5000);
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
