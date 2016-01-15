var ready;

ready = function() {
  checkSelect2();

  // checks if the tutorail has to be shown on landingspage
  checkTutorial();
};

/**
 * Sets the localStorage tutorial to true our false
 * @return {boolean} for localStorage.tutorial
 */

function checkTutorial(){
  if($('.map-container').length){
    if (localStorage.tutorial !== 'false'){
      localStorage.tutorial = true;
    }
    if(localStorage.tutorial === 'true'){
      initModal(true);
    }
  }
}

function initTutorial(){
  alert('Zo dus jij bent voor het eerst');
  alert('zoek het uit!');
}

function checkSelect2() {
  if ($('.js_init_select').length) {
    $('.js_init_select').select2();
  }
}

function checkSelect2(){
  if ($('.js_init_select').length) {
    $('.js_init_select').select2();
  }
}

$(document).ready(ready);
$(document).on('page:load', ready);
