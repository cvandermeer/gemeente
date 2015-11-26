function roleIdChange(){
  $('select#user_role_id').change(function(){
    if($(this).val() == 1){
      $('.user_community_select').show();
      $('.js_init_select').select2();
    }else if($(this).val() != 1){
      $('.user_community_select').hide();
    }
  });
}
