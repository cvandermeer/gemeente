var ready;

var validate;

ready = function() {
  setValidationForWrongWord();
};


function setValidationForWrongWord() {
  var validateOptions = {
    form: $('.new_wrong_word'),
    msg_required: 'Dit veld is verplicht'
  };

  validate = new Validate(validateOptions);
}

$(document).ready(ready);
$(document).on('page:load', ready);
