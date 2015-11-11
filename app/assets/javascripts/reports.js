var id;

function getReportIndex(data) {
  $('ul.reports').html(' ')
  for (var i = 0; i < data.length; i++)  {
    $.ajax({
      type: "GET",
      dataType: "html",
      url: "/reports/" + data[i].id + "/report_index",
      success: function(data){
        setReportIndex(data)
      }
    });
  }
}

function setReportIndex(data) {
  $('ul.reports').append(data)
  bindReportHandlers()
}

function bindReportHandlers() {
  $('.js_modal').bind('ajax:success', function(e, data, status) {
    setDataInModal(this ,data)
  });
}

/**
  * @desc sets the data in the modal
  * @return the new/edit report in the document
*/

function newReportForm() {
  $('.modal form.new_report, .modal form.edit_report').bind('ajax:success', function(e, data, status){
    if(data.indexOf('form') == -1) {
      data = data.replace(/\\n/g, '').replace(/\\/g, '').substring(1)
      data = data.substring(0, data.length - 2);
      $('.reports').append(data);

      var el = $('.reports li:last-child')
      if ($('.reports').find("[data-report-id='" + el.attr('data-report-id') + "']").length > 1) {
        $('.reports li:last-child').remove()
        $('.reports').find("[data-report-id='" + el.attr('data-report-id') + "']").before(data).remove()
      }
      removeModal();
      //setMarker(parseFloat(el.attr('data-lat')), parseFloat(el.attr('data-lon')), el.attr('data-title'), $(el).attr('data-id'))
      //goToReportLocation(el)
      bindReportHandlers()
    } else {
      $('.modal-content').html(data)
      newReportForm()
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
    removeModal()
    if ($('.show-side-menu').length) {
      $('.outer-wrapper, .side-menu').removeClass('show-side-menu');
      $('.hamburger').removeClass('active');
    }
  });
}
