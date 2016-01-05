var ready;

ready = function() {
  /**
    * @desc adds active class to notice and alert
    * @return remove active class after 5 seconds
  */
  if( $('.notice').length ) {
    $('.notice').addClass('active');
    removeNoticeAfterTime();
    onClickCloseNotice();
  }
};

function setNotice(notice) {
  var html = '<div class="notice">' + notice + '<div class="close"></div></div>';
  $('.notice-wrapper').html(html);
  $('.notice').addClass('active');
  removeNoticeAfterTime();
  onClickCloseNotice();
}

function removeNoticeAfterTime() {
  setTimeout(function() {
    removeNotice();
  }, 15000);
}

function removeNotice(){
  $('.notice').removeClass('active');
  setTimeout(function() {
    $('.notice').remove();
  }, 300);
}

function onClickCloseNotice() {
  $('.notice .close').on('click', function() {
    removeNotice();
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
