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
  * @desc gets the data for the info window through ajax
  * @param element el - stants for this
  * @return if ajax success return the data in a info window
*/

function setInfoWindow(el) {
  $.ajax({
    type: "GET",
    dataType: "html",
    url: "/reports/" + el.id + "/info_window",
    success: function(data){
      setInfoVal(data, el);
    }
  });
}

/**
  * @desc sets the data for the info window
  * @param string data - contains the show of reports/info_window
  * @param element el - stants for this
  * @return opens the infor window
*/

function setInfoVal(data, el) {
  var content = data;
  var id = $(el)[0].id;
  var infowindow = new google.maps.InfoWindow({
      id: id,
      content: content
  });
  infowindow.open(map,el);
}

/**map.setStreetViewdata in the modal
* @return the new/edit report in the document
*/

function newReportForm() {
  $('.modal form.new_report, .modal form.edit_report').bind('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      data = data.replace(/\\n/g, '').replace(/\\/g, '').substring(1);
      data = data.substring(0, data.length - 2);
      $('.reports').append(data);

      var el = $('.reports li:last-child');
      if ($('.reports').find("[data-report-id='" + el.attr('data-report-id') + "']").length > 1) {
        $('.reports li:last-child').remove();
        $('.reports').find("[data-report-id='" + el.attr('data-report-id') + "']").before(data).remove();
      }
      removeModal();
      bindReportHandlers();
    } else {
      $('.modal-content').html(data);
      newReportForm();
    }
  });
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
