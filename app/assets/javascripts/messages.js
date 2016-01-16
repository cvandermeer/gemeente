/**
 * Shows a notice to the user on ajax success from: modal.js
 */

function newMessage(){
  $('.modal form.new_message').on('ajax:success', function(){
    removeModal();
    $(".outer-wrapper" ).prepend("<div class='notice'>Contactbericht verzonden.</div>");
    removeNotice();
  });
}
