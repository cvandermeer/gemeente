function initSideModal() {
  $('.js_side_modal').bind('ajax:success', function(e, data, status) {
    setDataToSideModal(data);
    console.log(data);
  });
}

function setDataToSideModal(data) {
  $('body').append(data);
  setTimeout(function(){
    $('.side-modal').addClass('active');
  }, 300);
}
