function getReportsForIndex(data) {
  $('.js_all_reports').html(' ');
  if(data.length > 6) {
    $('.js_all_reports').height(85 * 6 + 42);
  } else if(data.length !== 0) {
    $('.js_all_reports').height(85 * data.length + 2);
  } else {
    $('.js_all_reports').height(0);
  }
  for (var i = 0; i < data.length; i++)  {
    fetchReport(data[i]);
  }
}

function fetchReport(data) {
  $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + data.id + "/report_index",
    success: function(data){
      setReportIndex(data);
    }
  });
}

function setReportIndex(data) {
  $('.js_all_reports').append(data);
  //bindReportHandlers();
  bindHoverOnReportShowActiveMarker();
  bindHoverOnMarkerShowActiveReport();
  initSideModal();
}

function bindHoverOnReportShowActiveMarker() {
  $('.report-show').hover(function() {
    $('.marker[data-marker-id="'+$(this).attr('data-report-id')+'"]').addClass('active');
  }, function() {
    $('.marker[data-marker-id="'+$(this).attr('data-report-id')+'"]').removeClass('active');
  });
}

function bindHoverOnMarkerShowActiveReport() {
  $('.marker').hover(function() {
    $('.report-show[data-report-id="'+$(this).attr('data-marker-id')+'"]').addClass('active');
  }, function() {
    $('.report-show[data-report-id="'+$(this).attr('data-marker-id')+'"]').removeClass('active');
  });
}
