var ready;

ready = function() {
  $('.js_report_modal').bind('ajax:success', function(e, data, status) {
    setReportModalData(data);
  });
};

function setReportModalData(data) {
  if ($('.report-modal').length === 0) {
    $('header').after(data);
    setTimeout(function() {
      $('.report-modal').addClass('active');
      $('.js_report_modal').parent().addClass('active');
    }, 300);
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
