var ready;

ready = function() {
  $('.js_login_modal').bind('ajax:success', function(e, data, status) {
    if ($('.login-modal').length === 0) {
      $('header').after(data);
      setTimeout(function() {
        $('.login-modal').addClass('active');
      }, 100);
      closeLoginModal();
    }
  });
};

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
