var ready;

ready = function() {

  $('.js_modal').on('ajax:success', function(e, data, status) {
    setDataInModal(this, data)
    $('input.datepicker').pickadate();
  });

  $('.modal-close').on('click', function() {
    removeModal()
  });
}

function initModal() {
  var modalBackground = '<div class="modal-background"></div>'
  if($('.modal-background').length == 0) {
     $('body').append(modalBackground)
  }
  setTimeout(function() {
    $('.modal').addClass('active')
    $('.modal-background').addClass('active')
    $('.modal-background').bind('click', function() {
      removeModal();
    });
  }, 100);
}

function setDataInModal(e, data) {
  initModal()
  if($(e).attr('data-modal-type') == 'destroy') {
    initDestroy(e, data)
  } else {
    // Building the modal
    $('.modal-content').html(data)

    // The function can be found in reports.js
    newReportForm()
    communityReports()
    // The function can be found in search.js
    triggerStreetSearch()
    triggerTownSearch()
  }
  bindHandlers()
}

function removeModal() {
  $('.modal-background, .modal').removeClass('active')
  $('.modal-content').html('')
  $('.modal-header h4').remove()
}

function initDestroy(e, data) {
  $('.modal-content').html('')
  $('.modal-header h4').remove()
  $('.modal-header').append('<h4>Delete</h4>')
  var modalText = '<p>Weet je zeker dat je <strong>'+ data.title +'</strong> wilt verwijderen?</p>'
  var modalDeleteLink = '<a data-method="delete" data-remote="true" class="modal-confirm button" href="/'+$(e).attr("data-modal-element")+'/' + data.id + ' ">Ja</a> <a href="#" class="modal-confirm button">Nee</a>'
  $('.modal-content').append(modalText + modalDeleteLink)
  $('.modal-confirm').bind('click', function() {
    if($(this).attr('data-method') == 'delete') {
      $('.reports').find("[data-report-id='" + data.id + "']").remove()
    }
    removeModal()
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
