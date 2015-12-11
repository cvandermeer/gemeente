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
      setTimeout(function() {
        $('.login-modal').remove();
      }, 300);
    }
    setTimeout(function() {
      $('.register-modal').addClass('active');
    }, 100);
    closeRegisterModal();
  }
}

function closeRegisterModal() {
  $('.register-modal .js_close_modal').on('click', function(){
    $('.register-modal').removeClass('active');
    setTimeout(function() {
      $('.register-modal').remove();
    }, 300);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
