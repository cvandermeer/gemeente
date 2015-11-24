var ready;

ready = function() {
  /**
    * @desc adds active class to notice and alert
    * @return remove active class after 5 seconds
  */
  removeNotice();
};

function removeNotice(){
  if( $('.notice').length ) {
    $('.notice').addClass('active');
    setTimeout(function() {
      $('.notice').removeClass('active');
    }, 15000);
    $('.notice .close').on('click', function() {
      $('.notice').removeClass('active');
    });
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
