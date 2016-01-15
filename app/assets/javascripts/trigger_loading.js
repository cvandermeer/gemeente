/**
 * @desc Trigger and removes the loading before and after an ajax request
 */

function triggerLoading() {
  $('.js_trigger_loading').on('click', function(){
    $('.loading').addClass('active');
  });

  $('form').bind('ajax:success', function(){
    $('.loading').removeClass('active');
  });
}
