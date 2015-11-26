var ready;

ready = function() {

  // Sets the data to modal on ajax success and bind the datepicker
  $('.js_modal').on('ajax:success', function(e, data, status) {
    setDataInModal(this, data);
  });

  // Onclick close the modal
  $('.modal-close').on('click', function() {
    removeModal();
  });
};

function triggerLoading(){
  $('.trigger_loading').on('click', function(){
    $('.loading').show();
  });
}

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
    $('.modal-background').bind('click', function() {
      removeModal();
    });
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
    newReportForm();
    communityReports();

    // These functions can be found in messages.js
    newMessage();

    // The functions can be found in search.js, sets up the list search
    triggerSearch();

    // Show loading spinner on submit click
    triggerLoading();

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
  $('.modal-header h4').remove();
  var modalDeleteLink;
  var modalText;
  // sets remote true is data-modal-remote != false
  if ($(e).attr('data-modal-remote') == 'false') {
    modalDeleteLink = '<a data-method="delete" class="modal-confirm button" href="/'+$(e).attr("data-modal-element")+'/' + data.id + ' ">Ja</a> <a href="#" class="modal-confirm button">Nee</a>';
  } else {
    modalDeleteLink = '<a data-method="delete"  data-remote="true" class="modal-confirm button" href="/'+$(e).attr("data-modal-element")+'/' + data.id + ' ">Ja</a> <a href="#" class="modal-confirm button">Nee</a>';
  }
  // sets the right content for in the delete modal
  if ($(e).attr('data-modal-element') == 'community_subscriptions') {
    $('.modal-header').append('<h4>Gemeente niet meer volgen</h4>');
    modalText = '<p>Weet je zeker dat je de gemeente: <strong>'+ $(e).attr('data-modal-community') +'</strong> niet meer wilt volgen?</p>';
  } else {
    $('.modal-header').append('<h4>Delete</h4>');
    modalText = '<p>Weet je zeker dat je <strong>'+ data.title +'</strong> wilt verwijderen?</p>';
  }

  $('.modal-content').append(modalText + modalDeleteLink);
  $('.modal-confirm').bind('click', function() {
    if($(e).attr('data-modal-element') == 'reports') {
      $('.reports').find("[data-report-id='" + data.id + "']").remove();
    }
    removeModal();
  });
}

/**
  * @desc binds the ajax success function
*/

function bindHandlers() {
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    triggerLoading();
    setDataInModal(this ,data);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
