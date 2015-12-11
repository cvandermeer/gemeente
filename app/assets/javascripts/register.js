var ready;

ready = function() {
  $('.js_register_modal').bind('ajax:success', function(e, data, status) {
    setRegisterModalData(data);
  });
};

function setRegisterModalData(data) {
  if ($('.register-modal').length === 0) {
    $('header').after(data);
    if($('.login-modal').length !== 0) {
      $('.login-modal').removeClass('active');
      $('.js_login_modal').parent().removeClass('active');
      setTimeout(function() {
        $('.login-modal').remove();
      }, 300);
    }
    setTimeout(function() {
      $('.register-modal').addClass('active');
      $('.js_register_modal').parent().addClass('active');
    }, 300);
    closeRegisterModal();
    bindLoginModal();
  }
}

function closeRegisterModal() {
  $('.register-modal .js_close_modal').on('click', function(){
    $('.register-modal').removeClass('active');
    $('.js_register_modal').parent().removeClass('active');
    setTimeout(function() {
      $('.register-modal').remove();
    }, 300);
  });
}

function bindLoginModal() {
  $('.js_login_modal').bind('ajax:success', function(e, data, status) {
    setLoginModalData(data);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
