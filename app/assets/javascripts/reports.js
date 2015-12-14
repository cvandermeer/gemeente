function bindReportFormResponse() {
  $('.report-modal form').bind("ajax:success", function(e, data){
    if(data !== null && typeof data === 'object') {
      goToReportLocation(data);
      removeHeaderModal($('.header-modal'));
    } else {
      $('.report-modal form').html(data);
      triggerAutocomplete();
      bindReportFormResponse();
    }
  });
}

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
  bindHoverToReport();
}

function bindReportHandlers() {
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data);
  });
}

function bindHoverToReport() {
  $('.reports li').hover(function() {
    $('.marker[data-marker-id="'+$(this).attr('data-reports-id')+'"]').addClass('active');
  }, function() {
    $('.marker[data-marker-id="'+$(this).attr('data-reports-id')+'"]').removeClass('active');
  });
}

/**
  * @desc when new report is added go to the location
  * @param element el - stants for this
  * @return a new location in de goolge maps api
*/

function goToReportLocation(data) {
  var position = {lat: data.latitude, lng: data.longitude};
  map.setCenter(position);
  map.setZoom(18);
}

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

$(function() {
  $('select#report_status').change(function(){
    $(this).parent().submit();
  });
});
