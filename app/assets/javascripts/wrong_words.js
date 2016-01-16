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

/**
 * @desc Set the ajax respons when a new wrong word is added
 */

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

/**
 * @desc Returns a validations notice to user after checking if the wrong word is uniq
 */

function setValidationForWrongWordIfInDataBase() {
  validate.setErrorMessage(0, $('.js_word').val() + ' staat al in de database');
  validate.setValid(0, false);
  validate.setClass(0);
  validate.setValid(0, true);
}

/**
 * @desc Appends the data to the document
 * @param {json} data Is the data of the wrong word without the status
 */

function setWrongWordData(data) {
  var wrong_word_position = setWrongWordPosition(data.word);
  wrong_word_position.find('ul').append('<li>' + data.word + '</li>');
}

/**
 * @desc Gets back the position to append the word
 * @param {string} data Is the wrong word string
 */

function setWrongWordPosition(data) {
  return $('.letter[data-letter="'+data.split('')[0]+'"]');
}


$(document).ready(ready);
$(document).on('page:load', ready);
