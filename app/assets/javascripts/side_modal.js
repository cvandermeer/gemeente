function initSideModal() {
  $('.js_side_modal').bind('ajax:success', function(e, data, status) {
    setDataToSideModal(data);
    //console.log(data);
  });
}

function setDataToSideModal(data) {
  if($('.side-modal').length !== 0) {
    removeSideModal($('.side-modal'));
  }
  $('body').append(data);
  setTimeout(function(){
    $('.side-modal').addClass('active');
  }, 300);
  bindSideModalHandlers();
}

function removeSideModal(modal) {
  modal.removeClass('active');
  setTimeout(function() {
    modal.remove();
  }, 300);
}

function bindSideModalHandlers() {
  $('.js_close_modal').on('click', function() {
    removeSideModal($('.side-modal'));
  });
}
