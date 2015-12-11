var ready;

ready = function() {
  $('.js_login_modal').bind('ajax:success', function(e, data, status) {
    setLoginModalData(data);
  });
};

function setLoginModalData(data) {
  if ($('.login-modal').length === 0) {
    $('header').after(data);
    if($('.register-modal').length !== 0) {
      $('.register-modal').removeClass('active');
      setTimeout(function() {
        $('.register-modal').remove();
      }, 300);
    }
    setTimeout(function() {
      $('.login-modal').addClass('active');
    }, 300);
    closeLoginModal();
  }
}

function closeLoginModal() {
  $('.login-modal .js_close_modal').on('click', function(){
    $('.login-modal').removeClass('active');
    setTimeout(function() {
      $('.login-modal').remove();
    }, 300);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
