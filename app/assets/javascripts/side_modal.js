var removedMarker = '';

function initSideModal() {
  $('.js_side_modal').bind('ajax:success', function(e, data, status) {
    setDataToSideModal(this, data);
  });
}

function setDataToSideModal(el, data) {
  if($('.side-modal').length !== 0) {
    removeSideModal($('.side-modal'));
  }
  if($('.header-modal').length !== 0) {
    removeHeaderModal($('.header-modal'));
  }
  $('body').append(data);
  setTimeout(function(){
    $('.side-modal').addClass('active');
    if($(el).attr('data-modal-type') === 'edit-report') {
      bindReportFormResponse('edit');
      removedMarker = $('.marker[data-marker-id="'+$(el).attr('data-report-id')+'"]');
      removedMarker.css('opacity', '0');
      setNewMarkerOnMap($('.js_latitude_input').val(), $('.js_longitude_input').val());
    }
  }, 300);
  bindSideModalHandlers();

}

function removeSideModal(modal) {
  modal.removeClass('active');
  setTimeout(function() {
    modal.remove();
  }, 300);
  if(removedMarker !== '') {
    removedMarker.css('opacity', '1');
  }
}

function bindSideModalHandlers() {
  $('.js_close_modal, .modal-confirm').on('click', function() {
    removeSideModal($('.side-modal'));
  });
  $('.modal-confirm.yes').bind('ajax:success', function(e, data, status) {
    removeReportAndMarker(data);
  });
}

function removeReportAndMarker(data) {
  $('.report-show[data-report-id="'+data.id+'"]').remove();
  $('.marker[data-marker-id="'+data.id+'"]').parent().remove();
  resetHeightOfAllReports();
}

function resetHeightOfAllReports() {
  var report_count = $('.js_all_reports').find('.report-show').length;
  if(report_count > 6) {
    $('.js_all_reports').height(88 * 6 + 44);
  } else {
    $('.js_all_reports').height(88 * report_count - 1);
  }
}
