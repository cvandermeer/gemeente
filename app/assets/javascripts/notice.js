var ready;

ready = function() {

  /**
    * @desc adds active class to notice and alert
    * @return remove active class after 5 seconds
  */

  if( $('.notice, .alert').length ) {
    $('.notice, .alert').addClass('active');
    setTimeout(function() {
      $('.notice, .alert').removeClass('active');
    }, 5000);
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
