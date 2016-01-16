/**
 * @desc Sets the height for the index of reports,
 * This function is triggerd from: markers.js
 * @param {json} data Is the data of al reports within the map bounds
 */

function setHeightForReportsIndex(data) {
  $('.js_all_reports').html(' ');
  if(data.length > 6) {
    $('.js_all_reports').height(85 * 6 + 42);
  } else if(data.length !== 0) {
    $('.js_all_reports').height(85 * data.length + 2);
  } else {
    $('.js_all_reports').height(0);
  }
  for (var i = 0; i < data.length; i++)  {
    // Gets the html data for each report
    fetchReport(data[i]);
  }
}

/**
 * @desc Gets the html data for each report
 * @param {json} data Is the data of one report
 */

function fetchReport(data) {
  $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + data.id + "/report_index",
    success: function(data){
      // Sets the report to the index
      setReportIndex(data);
    }
  });
}

/**
 * @desc Sets the report to the index
 * @param {html} data Is the html of a report
 */

function setReportIndex(data) {
  $('.js_all_reports').append(data);

  // Binds the hover function to the report
  bindHoverOnReportShowActiveMarker();

  // Binds the side modal for the edit and destroy of a report in: side_modal.js
  initSideModal();
}

/**
 * @desc Binds the hover function to a report, to show the related marker
 */

function bindHoverOnReportShowActiveMarker() {
  $('.report-show:last-child').hover(function() {
    $('.marker[data-marker-id="'+$(this).attr('data-report-id')+'"]').addClass('active');
  }, function() {
    $('.marker[data-marker-id="'+$(this).attr('data-report-id')+'"]').removeClass('active');
  });
}
