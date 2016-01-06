var ready;

ready = function() {
  validateUserEdit();
  triggerAutocomplete();
};

function validateUserEdit() {
  var validateOptions = {
    form: $('.edit_user'),
    msg_email: 'Gebruik een juist email adres',
    msg_required: 'Dit veld is verplicht'
  };

  if($('.edit_user').length !== 0) validate = new Validate(validateOptions);
}

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

$(document).ready(ready);
$(document).on('page:load', ready);
