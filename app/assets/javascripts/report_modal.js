var ready;

ready = function() {
  $('.js_report_modal').bind('ajax:success', function(e, data, status) {
    setReportModalData(data);
  });
};

function setReportModalData(data) {
  if ($('.report-modal').length === 0) {
    console.log(data);
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
