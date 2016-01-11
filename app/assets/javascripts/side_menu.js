var ready;
var timer;

ready = function() {

  // toggles class to show the side menu
  onClickSetSideMenu();
  // removes class to hide side menu if active
  $('.index-wrapper, .wrapper').on('click', function(e) {
    if ($('.hamburger.active').length) {
      e.preventDefault();
      removeSideMenu();
    }
  });

  window.onresize = function(event) {
    clearInterval(timer);
    timer = setTimeout(function(){
      if(document.body.clientWidth >= 940 && $('.hamburger.active').length) {
        removeSideMenu();
      }
    }, 200);
  };
};

function onClickSetSideMenu() {
  $('.hamburger').on('click', function() {
    $('.hamburger').toggleClass('active');
    $('header, .index-outer-wrapper, .outer-wrapper, .side-menu').toggleClass('show-side-menu');
  });
}

function removeSideMenu() {
  $('.hamburger').removeClass('active');
  $('header, .index-outer-wrapper, .outer-wrapper, .side-menu').removeClass('show-side-menu');
}

$(document).ready(ready);
$(document).on('page:load', ready);
