var ready;

ready = function() {
  // On ajax success sets the data to the header modal
  $('.js_header_modal').on('ajax:success', function(e, data, status) {
    var el = e.currentTarget;
    setHeaderModalData(el, data);
  });
};

/**
 * @desc Sets the data to the header modal
 * @param {element} el is the link click to init the header modal.
 * @param {html} data from the ajax request
 */

function setHeaderModalData(el, data) {
  if(!$(el).parent().hasClass('active')) {
    // Removes header modal if active
    if ($('.header-modal').length !== 0) {
      removeHeaderModal($('.header-modal'));
    }
    // Removes side modal if active
    if($('.side-modal').length !== 0) {
      removeSideModal($('.side-modal'));
    }
    // Appends the header modal to the header
    $('header').after(data);

    // After appending wait 300 miliseconds before adding the active class
    setTimeout(function() {
      $('.header-modal, .arrow-up').addClass('active');
      $(el).parent().addClass('active');
    }, 300);

    // Binds header close functions
    closeHeaderModal();
    bindHeaderModal();

    // Binds the ajax response on the contact form
    $('.contact-modal form').on('ajax:success', function(e, data){
      removeHeaderModal($('.header-modal'));
      // Shows a notice after ajax success
      setNotice('Uw vraag, bericht of feedback is ontvangen');
    });

    if($(el).attr('data-modal-type') == 'contact') {
      // Sets the validation to de form
      setHeaderModalValidation('.new_message');
    }

    if($(el).attr('data-modal-type') == 'register') {
      // Sets the validation to de form
      setHeaderModalValidation('.new_user');
    }

    if($(el).attr('data-modal-type') == 'new-report') {
      // Sets the response for doing a report (new_reports.js)
      bindReportFormResponse('new');
      // Closes a info window if active
      findAndCloseInfoBox();
    }
  }
}

/**
 * @desc Removes the active class from header modal,
 * after 300 miliseconds removes the header modal
 * Removes also key bindings of the map and the new marker if active
 * @param {number} currentHeaderModal is the active header modal
 */

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

/**
 * @desc Onclick close modal, removes the header modal
 */

function closeHeaderModal() {
  $('.header-modal .js_close_modal').on('click', function(){
    removeHeaderModal($('.header-modal'));
  });
}

/**
 * @desc Binds the on ajax success function to the links in the header modal
 */

function bindHeaderModal() {
  $('.js_header_modal_link').on('ajax:success', function(e, data, status) {
    setHeaderModalData(e, data);
  });
}

/**
 * @desc Sets the validation to the form
 * @param {element} el is the specific form to validate
 */

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
