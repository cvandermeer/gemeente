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
      setWrongWordData(data.wrong_word);
    } else if (data.status === 422) {
      // Could not proces the data
      setValidationForWrongWordIfInDataBase();
    }
  });
}

function setValidationForWrongWordIfInDataBase() {
  validate.setErrorMessage(0, $('.js_word').val() + ' staat al in de database');
  validate.setValid(0, false);
  validate.setClass(0);
}

function setWrongWordData(data) {
  var wrong_word_position = setWrongWordPosition(data.word);
  wrong_word_position.find('ul').append('<li>' + data.word + '</li>');
}

function setWrongWordPosition(data) {
  return $('.letter[data-letter="'+data.split('')[0]+'"]');
}


$(document).ready(ready);
$(document).on('page:load', ready);
