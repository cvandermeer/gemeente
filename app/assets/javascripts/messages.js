function newMessage(){
  $('.modal form.new_message').on('ajax:success', function(){
    removeModal();
    $(".outer-wrapper" ).prepend("<div class='notice'>Contactbericht verzonden.</div>");
    removeNotice();
  });
}
