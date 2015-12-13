var ready;

ready = function() {
  $('.js_header_modal').bind('ajax:success', function(e, data, status) {
    var el = e.currentTarget;
    setHeaderModalData(el, data);
  });
};

function setHeaderModalData(el, data) {
  if(!$(el).parent().hasClass('active')) {
    if ($('.header-modal').length !== 0) {
      removeHeaderModal($('.header-modal'));
    }
    $('header').after(data);
    setTimeout(function() {
      $('.header-modal').addClass('active');
      $(el).parent().addClass('active');
    }, 300);

    closeHeaderModal();
    bindHeaderModal();
  }
}

function removeHeaderModal(currentHeaderModal) {
  currentHeaderModal.removeClass('active');
  $('.js_header_modal').parent().removeClass('active');
  setTimeout(function() {
    currentHeaderModal.remove();
  }, 300);
}

function closeHeaderModal() {
  $('.header-modal .js_close_modal').on('click', function(){
    removeHeaderModal($('.header-modal'));
  });
}

function bindHeaderModal() {
  $('.js_header_modal_link').bind('ajax:success', function(e, data, status) {
    setHeaderModalData(e, data);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
