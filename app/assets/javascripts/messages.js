function newMessage(){
  $('.modal form.new_message').on('ajax:success', function(e, data, status){
    removeModal();
  });
}
