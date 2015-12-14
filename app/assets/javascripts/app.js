var ready;

ready = function() {
  if ($('.js_init_select').length) {
    $('.js_init_select').select2();
  }
};

function checkSelect2(){
  if ($('.js_init_select').length) {
    $('.js_init_select').select2();
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
