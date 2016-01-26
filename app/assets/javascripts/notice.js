var ready;

ready = function() {
  // If notice is present add the class active to show the notice
  if( $('.notice').length ) {
    $('.notice').addClass('active');

    // Removes the notice after x seconds
    removeNoticeAfterTime();

    // Onclick close remove the notice
    onClickCloseNotice();
  }

  // If localStorage afterReloadNotice is not undefined set the notice
  if(typeof localStorage.afterReloadNotice !== "undefined") {
    setNotice(localStorage.afterReloadNotice);
    delete localStorage.afterReloadNotice;
  }
};

/**
 * @desc Adds and shows the notice in the document
 * @param {string} notice Is the message for the notice
 */

function setNotice(notice) {
  var html = '<div class="notice">' + notice + '<div class="close"></div></div>';
  $('.notice-wrapper').html(html);
  $('.notice').addClass('active');

  // Removes the notice after x seconds
  removeNoticeAfterTime();

  // Onclick close remove the notice
  onClickCloseNotice();
}

/**
 * @desc Trigger the function to removeNotice after 15 seconds
 */

function removeNoticeAfterTime() {
  setTimeout(function() {
    removeNotice();
  }, 15000);
}

/**
 * @desc Removes the notice from the document
 */

function removeNotice(){
  $('.notice').removeClass('active');
  setTimeout(function() {
    $('.notice').remove();
  }, 300);
}

/**
 * @desc Onclick close the function removeNotice is triggerd
 */

function onClickCloseNotice() {
  $('.notice .close').on('click', function() {
    removeNotice();
  });
}

/**
 * @desc Sets the localStorage afterReloadNotice value
 * @param {string} notice Is the message for the notice
 */

function setAfterReloadNotice(notice) {
  localStorage.afterReloadNotice = notice;
}

$(document).ready(ready);
$(document).on('page:load', ready);
