function getReportIndex(data) {
  $('ul.reports').html(' ');
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
  $('ul.reports').append(data);
  bindReportHandlers();
}

function bindReportHandlers() {
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data);
  });
}

/**
  * @desc setting the new report to the left side
  * @return the new/edit report in the document
*/

function newReportForm() {
  $('.modal form.new_report, .modal form.edit_report').on('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      data = data.replace(/\\n/g, '').replace(/\\/g, '').substring(1);
      data = data.substring(0, data.length - 2);
      $('.reports').append(data);
      var el = $('.reports li:last-child');
      goToReportLocation(el);
      if ($('.reports').find("[data-report-id='" + el.attr('data-report-id') + "']").length > 1) {
        $('.reports li:last-child').remove();
        $('.reports').find("[data-report-id='" + el.attr('data-report-id') + "']").before(data).remove();
      }
      removeModal();
      bindReportHandlers();
      $('.loading').hide();
    } else {
      $('.modal-content').html(data);
      $('.loading').hide();
      triggerLoading();
      newReportForm();
    }
  });
}

/**
  * @desc when new report is added go to the location
  * @param element el - stants for this
  * @return a new location in de goolge maps api
*/

function goToReportLocation(el) {
  var position = {lat: parseFloat($(el).attr('data-lat')), lng: parseFloat($(el).attr('data-lon'))};
  map.setCenter(position);
  map.setZoom(15);
  // setPanorama(clicked_position)
}

/**
  * @desc shows the reports when user is filterering on community
  * @return sets the new data to the content container
*/

function communityReports(){
  $('.community-reports').on('ajax:success', function(e, data, status){
    var clat = $(this).parent().attr('data-lat');
    var clon = $(this).parent().attr('data-lon');
    map.setCenter({lat: parseFloat(clat), lng: parseFloat(clon)});
    map.setZoom(13);
    $('.wrapper .content').html(data);
    removeModal();
    if ($('.show-side-menu').length) {
      $('.outer-wrapper, .side-menu').removeClass('show-side-menu');
      $('.hamburger').removeClass('active');
    }
  });
}
