var ready;
var timer;

ready = function() {

  // toggles class to show the side menu
  onClickSetSideMenu();

  // Onclick outside of the side menu remove the active class
  $('.index-wrapper, .wrapper').on('click', function(e) {
    if ($('.hamburger.active').length) {
      e.preventDefault();
      closeSideMenu();
    }
  });

  // Onresize if side menu active close side menu
  window.onresize = function(event) {
    clearInterval(timer);
    timer = setTimeout(function(){
      if(document.body.clientWidth >= 940 && $('.hamburger.active').length) {
        closeSideMenu();
      }
    }, 200);
  };
};

/**
 * @desc Onclick hamburger menu open our close the side menu
 */

function onClickSetSideMenu() {
  $('.hamburger').on('click', function() {
    $('.hamburger').toggleClass('active');
    $('header, .index-outer-wrapper, .outer-wrapper, .side-menu').toggleClass('show-side-menu');
  });
}

/**
 * @desc Close the side menu
 */

function closeSideMenu() {
  $('.hamburger').removeClass('active');
  $('header, .index-outer-wrapper, .outer-wrapper, .side-menu').removeClass('show-side-menu');
}

$(document).ready(ready);
$(document).on('page:load', ready);
