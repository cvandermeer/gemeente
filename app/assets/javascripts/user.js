function roleIdChange(){
  $('select#user_role_id').change(function(){
    if($(this).val() == 1){
      $('.user_community_select').show();
    }else if($(this).val() != 1){
      $('.user_community_select').hide();
    }
  });
}
