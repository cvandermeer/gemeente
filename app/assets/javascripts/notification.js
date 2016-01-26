var ready;

ready = function() {
  // Sets the ajax response when notification is destroyed
  setAjaxDeleteNotification();

  // Sets the notification to read
  setNotificationToRead();
};

/**
 * @desc Sets the response when notification is deleted
 */

function setAjaxDeleteNotification() {
  $('.js_delete_notification').on('ajax:success', function(e, data, status){
    setNotice('Uw bericht is verwijderd!');
    $('.notification[data-notification-id="'+data.id+'"]').remove();
  });
}

/**
 * @desc Sets the notification to read
 */

 function setNotificationToRead() {
   $('.js_notification_read').on('click', function(e) {
     $.ajax({
       type: 'POST',
       url: "/notifications/read",
       data: { 'id': $(e.currentTarget).attr('data-notification-id') },
     });
   });
 }



$(document).ready(ready);
$(document).on('page:load', ready);
