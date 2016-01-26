var ready;

var validate;

ready = function() {
  if($('.wrong-words').length) {
    // Sets the validation for the new wrong word form
    setValidationForWrongWord();

    // Sets the form responce for a new wrong word
    newWrongWordRepsonse();

    // Onclick letter, show our hide al the wrong words
    onClickLetterToggleClassActive('.letter h3');

    // Onclick delete wrong word
    onClickDeleteWrongWord($('.js_delete_word'));
  }
};

/**
 * @desc Sets the validation for a new wrong word
 */

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
  validate.setFocus(0);
}

/**
 * @desc Appends the data to the document, and gives back a notice to the user
 * @param {json} data Is the data of the wrong word without the status
 */

function setWrongWordData(data) {
  $('.js_word').val('').focus();

  // Gives the user a notice that the word is added, in: notice.js
  setNotice('Het foute woord: '+data.word+' is toegevoegd');

  var wrong_word_position = setWrongWordPosition(data.word);

  // Adds an active class to the parent of the new wrong word
  addActiveClassToWrongWordPosition(wrong_word_position);
  $('li').removeClass('new-wrong-word');
  var html = '<li data-wrong-word-id="'+data.id+'" class="new-wrong-word">' +
                data.word +
                '<div class="delete-word">' +
                  '<div class="delete">' +
                  '</div>' +
                  '<a data-remote="true" class="js_delete_word"' +
                      'rel="nofollow" data-method="delete" href="/wrong_words/'+data.id+'">' +
                    'Verwijderen?' +
                  '</a>' +
                '</div>' +
              '</li>';
  wrong_word_position.find('ul').append(html);
  onClickDeleteWrongWord($('li[data-wrong-word-id="'+data.id+'"] .js_delete_word'));
}

/**
 * @desc Gets back the position to append the word
 * @param {string} data Is the wrong word string
 * @return Returns the element to append the wrong word
 */

function setWrongWordPosition(data) {
  var letter = data.split('')[0];
  var element =  $('.letter[data-letter="'+letter+'"]');
  if (element.length === 0) {
    var html = '<div class="letter" data-letter="'+letter+'">' +
                  '<h3>'+letter+'</h3>' +
                  '<ul></ul>' +
               '</div>';
    $('.letter-panel').append(html);

    // binds the click function to show our hide the wrong word of the letter
    onClickLetterToggleClassActive('.letter[data-letter="'+letter+'"] h3');

    return $('.letter[data-letter="'+letter+'"]');
  } else {
    return element;
  }
}

/**
 * @desc Toggles class active when letter is clicked
 * @param {element} element Is the element that get the click
 */

function onClickLetterToggleClassActive(element) {
  $(element).on('click', function() {
    $(this).toggleClass('active');
    $(this).parent().toggleClass('active');
  });
}

/**
 * @desc Adds an active class to the parent of the wrong word
 * @param {element} element Is the letter/parent of the wrong word thats added
 */

function addActiveClassToWrongWordPosition(element) {
  if(!(element.hasClass('active'))) {
    element.addClass('active');
    element.find('h3').addClass('active');
  }
}

function onClickDeleteWrongWord(element) {
  element.bind('ajax:success', function(e, data, status) {
    $('li[data-wrong-word-id="'+data.id+'"]').remove();
    // Gives back a notice to the user when word is removed in: notice.js
    setNotice(data.word + ' is met succes verwijdert');
    var letter = data.word.split('')[0];
    if($('.letter[data-letter="'+letter+'"] li').length === 0) {
      $('.letter[data-letter="'+letter+'"]').remove();
    }
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
