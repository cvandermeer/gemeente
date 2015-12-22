var ready;

ready = function() {
  $('.js_header_modal').on('ajax:success', function(e, data, status) {
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
      $('.header-modal, .arrow-up').addClass('active');
      $(el).parent().addClass('active');
    }, 300);

    closeHeaderModal();
    bindHeaderModal();

    $('.contact-modal form').on('ajax:success', function(e, data){
      removeHeaderModal($('.header-modal'));
      setNotice('Uw contactbericht is ontvangen');
    });

    if ($(el).attr('data-modal-type') == 'report') {
      // reports.js
      bindReportFormResponse();
    }
  }
}

function removeHeaderModal(currentHeaderModal) {
  currentHeaderModal.removeClass('active');
  currentHeaderModal.parent().find('.arrow-up').removeClass('active');
  $('.js_header_modal').parent().removeClass('active');
  setTimeout(function() {
    currentHeaderModal.parent().remove();
  }, 300);
  map.setOptions({draggableCursor:''});
  google.maps.event.removeListener(clickListenerForNewMarkerHandle);
  if($('.new-marker').length !== 0) {
    removeOldNewMarker();
  }
}

function closeHeaderModal() {
  $('.header-modal .js_close_modal').on('click', function(){
    removeHeaderModal($('.header-modal'));
  });
}

function bindHeaderModal() {
  $('.js_header_modal_link').on('ajax:success', function(e, data, status) {
    setHeaderModalData(e, data);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
