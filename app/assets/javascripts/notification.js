var ready;

ready = function() {
  // Sets the ajax response when notification is destroyed
  setAjaxDeleteNotification();
};

function setAjaxDeleteNotification() {
  $('.js_delete_notification').on('ajax:success', function(e, data, status){
    setNotice('Uw bericht is verwijdert!');
    $('.notification[data-notification-id="'+data.id+'"]').remove();
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
