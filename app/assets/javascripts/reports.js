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
}
