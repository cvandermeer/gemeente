var ready;

ready = function() {

  // toggles class to show the side menu
  $('.hamburger').on('click', function() {
    $('.hamburger').toggleClass('active');
    $('.outer-wrapper, .side-menu').toggleClass('show-side-menu');
  });

  // removes class to hide side menu if active
  $('.wrapper').on('click', function() {
    if ($('.hamburger.active').length) {
      $('.hamburger').removeClass('active');
      $('.outer-wrapper, .side-menu').removeClass('show-side-menu');
    }
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
