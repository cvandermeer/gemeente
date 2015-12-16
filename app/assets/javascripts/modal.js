var ready;

ready = function() {

  $('.js_modal').on('ajax:success', function(e, data, status) {
    setDataInModal(this ,data);
  });

  // Onclick close the modal
  $('.modal-close').on('click', function() {
    removeModal();
  });
};

/**
  * @desc appends the modalbackground and binds the onclick function
  * @return adds an active class to the modal and modal-background
*/

function initModal() {
  var modalBackground = '<div class="modal-background"></div>';
  if($('.modal-background').length === 0) {
     $('body').append(modalBackground);
  }
  setTimeout(function() {
    $('.modal').addClass('active');
    $('.modal-background').addClass('active');
  }, 100);
}

/**
  * @desc sets the data in modal and initializes the modal
  * @param element e - stants for this
  * @param string data - is the data returned by ajax
*/

function setDataInModal(e, data) {
  initModal();
  if($(e).attr('data-modal-type') == 'destroy') {
    initDestroy(e, data);
  } else {
    // Building the modal
    $('.modal-content').html(data);

    // The functions can be found in reports.js
    communityReports();

    // These functions can be found in messages.js
    newMessage();

    // Check for select2 form fields_for
    checkSelect2();

    // The functions can be found in search.js, sets up the list search
    // triggerSearch();
    triggerAutocomplete();

    // Show loading spinner on submit click
    triggerLoading();

    // Check select change for user role_id
    roleIdChange();

    // Datepicker
    $('input.datepicker').pickadate();
  }
  bindHandlers();
}

/**
  * @desc removes the modal and its content
*/

function removeModal() {
  $('.modal-background, .modal').removeClass('active');
  $('.modal-content').html('');
  $('.modal-header h4').remove();

}

/**
  * @desc sets the data in modal for the destroy function
  * @param element e - stants for this
  * @param json data - is the data returned by ajax
  * @return if modal confirm is delete, remove report from document
*/

function initDestroy(e, data) {
  $('.modal-content').html('');
  $('.modal-content').append(data);
  $('.modal-confirm').on('click', function() {
    if($(this).attr('data-controller-name') == 'reports') {
      $("[data-"+ $(this).attr('data-controller-name') +"-id='" + $(this).attr('data-id') + "']").remove();
    }
    removeModal();
  });
}

/**
  * @desc binds the ajax success function
*/

function bindHandlers() {
  $('.modal-background, .modal-confirm').on('click', function() {
    removeModal();
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
