var ready;
var removedMarker = '';

ready = function() {
  // If on show page of report bind side modal
  if($('.map-show').length) {
    $('.js_side_modal').on('ajax:success', function(e, data, status) {
      // Set the data to the side modal
      setDataToSideModal(this, data);
    });
  }
};

/**
 * @desc Binds the side modal to every last report added to the index,
 * this function is trigged from: reports.js
 */

function initSideModal() {
  $('.report-show:last-child .js_side_modal').on('ajax:success', function(e, data, status) {
    // Sets the data for the side modal
    setDataToSideModal(this, data);
  });
}

/**
 * @desc Sets the data for the side modal
 * @param {element} el Is the this element
 * @param {html} data Is the html for the side modal
 */

function setDataToSideModal(el, data) {
  if($('.side-modal').length !== 0) {
    removeSideModal($('.side-modal'));
  }
  if($('.header-modal').length !== 0) {
    removeHeaderModal($('.header-modal'));
  }
  if($('.new-marker').length !== 0) {
    $('.new-marker').remove();
  }
  $('body').append(data);
  setTimeout(function(){
    $('.side-modal').addClass('active');
    if($('.map-show').length) {
      $('.side-modal').addClass('in-show');
    }
    if($(el).attr('data-modal-type') === 'edit-report') {
      // Binds the form responses for edit report in: new_report.js
      bindReportFormResponse('edit');

      // Finds and closes a info window in: info_window.js
      findAndCloseInfoBox();

      removedMarker = $('.marker[data-marker-id="'+$(el).attr('data-report-id')+'"]');
      if($('.map-show').length) {
        removedMarker = $('.marker');
      }
      removedMarker.css('opacity', '0');
      setNewMarkerOnMap($('.js_latitude_input').val(), $('.js_longitude_input').val());
    }
  }, 300);

  // Binds side modal click events
  bindSideModalHandlers();

}

/**
 * @desc Removes the modal from the document
 * @param {element} modal Is the current side modal
 */

function removeSideModal(modal) {
  modal.removeClass('active');
  setTimeout(function() {
    modal.remove();
  }, 300);
  if(removedMarker !== '') {
    removedMarker.css('opacity', '1');
  }
}

/**
 * @desc Binds the click event to the side modal
 */

function bindSideModalHandlers() {
  $('.js_close_modal, .modal-confirm').on('click', function() {
    removeSideModal($('.side-modal'));
    if($('.new-marker').length !== 0) {
      $('.new-marker').parent().remove();
    }
  });
  $('.modal-confirm.yes').bind('ajax:success', function(e, data, status) {
    if($('.map-show').length) {
      // Sets the notice that shown after the page is reloaded
      setAfterReloadNotice('Uw melding is verwijderd!');
      // Refreshes the current page
      location.href = location.origin;
    } else {
      // Removes the report and marker from the document
      removeReportAndMarker(data);
      // Shows a notice to the user
      setNotice('Uw melding is verwijderd!');
    }

  });
}

/**
 * @desc Removes the report from the document
 * @param {json} data Is the json data of the report
 */

function removeReportAndMarker(data) {
  $('.report-show[data-report-id="'+data.id+'"]').remove();
  $('.marker[data-marker-id="'+data.id+'"]').parent().remove();
  resetHeightOfAllReports();
}

/**
 * @desc Resets the height of the index after the report is removed
 */

function resetHeightOfAllReports() {
  var report_count = $('.js_all_reports').find('.report-show').length;
  if(report_count > 6) {
    $('.js_all_reports').height(85 * 6 + 44);
  } else {
    $('.js_all_reports').height(85 * report_count - 1);
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
