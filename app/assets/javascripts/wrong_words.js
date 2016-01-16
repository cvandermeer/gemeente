var ready;

var validate;

ready = function() {
  setValidationForWrongWord();

  newWrongWordRepsonse();
};

function setValidationForWrongWord() {
  var validateOptions = {
    form: $('.new_wrong_word'),
    msg_required: 'Dit veld is verplicht'
  };

  validate = new Validate(validateOptions);
}

function newWrongWordRepsonse() {
  $('.new_wrong_word').on('ajax:success', function(e, data, status) {
    if (data.status === 200) {
      // Data is succesfully posted
      console.log(data);
    } else if (data.status === 422) {
      // Could not proces the data
      validate.setErrorMessage(0, $('.js_word').val() + ' staat al in de database');
      validate.setFocus(0);
      validate.setValid(0, false);
      validate.setClass(0);
    }
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
