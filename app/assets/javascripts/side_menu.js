var ready;

ready = function() {

  // toggles class to show the side menu
  $('.hamburger').on('click', function() {
    $('.hamburger').toggleClass('active');
    $('.index-outer-wrapper, .outer-wrapper, .side-menu').toggleClass('show-side-menu');
  });

  // removes class to hide side menu if active
  $('.index-wrapper, .wrapper').on('click', function(e) {
    if ($('.hamburger.active').length) {
      e.preventDefault();
      $('.hamburger').removeClass('active');
      $('.index-outer-wrapper, .outer-wrapper, .side-menu').removeClass('show-side-menu');
    }
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
