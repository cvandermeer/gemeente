var ready;

ready = function() {
  // Sets the validation for a new category
  if($('.new_category').length) {
    setValidationForNewCategories();
  }

  // Set the validation for edditing a category
  if($('.edit_category').length) {
    setValidationForEditCategories();
  }
};

/**
 * @desc Sets the validation for a new category
 */

function setValidationForNewCategories() {
  var validateOptions = {
    form: $('.new_category'),
    msg_required: 'Dit veld is verplicht'
  };
  validate = new Validate(validateOptions);
}

/**
 * @desc Sets the validation for a edditing a category
 */

function setValidationForEditCategories() {
  var validateOptions = {
    form: $('.edit_category'),
    msg_required: 'Dit veld is verplicht'
  };
  validate = new Validate(validateOptions);
}

$(document).ready(ready);
$(document).on('page:load', ready);
