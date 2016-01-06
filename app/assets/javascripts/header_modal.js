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
    if($('.side-modal').length !== 0) {
      removeSideModal($('.side-modal'));
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
      setNotice('Uw vraag, bericht of feedback is ontvangen');
    });

    if($(el).attr('data-modal-type') == 'contact') {
      setHeaderModalValidation('.new_message');
    }

    if($(el).attr('data-modal-type') == 'register') {
      setHeaderModalValidation('.new_user');
    }

    if($(el).attr('data-modal-type') == 'new-report') {
      // new_reports.js
      bindReportFormResponse('new');
      findAndCloseInfoBox();
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

function setHeaderModalValidation(el) {
  var validateOptions = {
    form: $(el),
    msg_compare: 'Zorg ervoor dat de waardes gelijk zijn',
    msg_email: 'Gebruik een juist email adres',
    msg_min_length: 'Minimaal aantal tekens: ',
    msg_required: 'Dit veld is verplicht'
  };

  validate = new Validate(validateOptions);
}



$(document).ready(ready);
$(document).on('page:load', ready);
