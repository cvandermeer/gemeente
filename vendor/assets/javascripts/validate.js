
function Validate(opt_options) {

  var options = opt_options || {};

  if(typeof options.form === 'undefined') {
    options.form = $(document).find('form')[0];
    if(typeof options.form === 'undefined') {
        console.log('Make sure there\'s a form in the document!');
    }
  }

  if(typeof options.msg_required === 'undefined') {
    options.msg_required = 'This field is required';
  }

  if(typeof options.msg_min_length === 'undefined') {
    options.msg_min_length = 'Minimal characters of: ';
  }

  if(typeof options.msg_compare === 'undefined') {
    options.msg_compare = 'Make sure the values are the same';
  }

  if(typeof options.msg_email === 'undefined') {
    options.msg_email = 'Use a valid email address';
  }

  if(typeof options.use_error_message === 'undefined') {
    options.use_error_message = true;
  }

  this.options = options;

  this.initValidate();
}

/**
* Initializing the validate
*/

Validate.prototype.initValidate = function() {
  this.getInputFields();

  if(this.validate_field.length > 0) {
    this.onSubmitCheck();

    // Setting values for the input fields
    for(var i = 0; i < this.validate_field.length; i++) {
      this.setOldClassName(i);

      this.setValid(i, true);

      this.setCompare(i);

      this.setMinLength(i);

    }
  } else {
    console.log('There is no need for a validation, you don\'t have any required fields');
  }
};

/**
* Getting back all the input fields that need to be validated
*/

Validate.prototype.getInputFields = function() {
  this.form = this.options.form;
  this.validate_field = [];
  var that = this;
  var setInputFields = function(object) {
    for(var i = 0; i < object.children.length; i++) {
      if(typeof object.children[i].attributes.validate != 'undefined') {
        that.validate_field.push(object.children[i]);
      } else {
        if(object.children[i].children.length > 0) {
          setInputFields(object.children[i]);
        }
      }
    }
  };

  setInputFields(this.form[0]);
};

/**
* Sets the compare with
*/

Validate.prototype.setCompare = function(i) {
  if(typeof this.validate_field[i].attributes.validate_compare !== 'undefined') {
    var compareValue = this.validate_field[i].attributes.validate_compare.value;

    for(var j = 0; j < this.validate_field.length; j++) {
      if(typeof this.validate_field[j].attributes.validate_compare !== 'undefined' && i != j) {
        this.validate_field[i].compare_with = j;
      }
    }
  }
};

/**
* Sets the old class so the input class can be set back to his old ways
*/

Validate.prototype.setOldClassName = function(i) {
  this.validate_field[i].old_class_name = this.validate_field[i].className || '';
};

/**
* Sets valid to false our true
*/

Validate.prototype.setValid = function(i, boolean) {
  this.validate_field[i].valid = boolean;
};

/**
* Set the min length of the input
*/

Validate.prototype.setMinLength = function(i) {
  if(typeof this.validate_field[i].attributes.validate_min_length !== 'undefined') {
    var validate_min_length = parseInt(this.validate_field[i].attributes.validate_min_length.value);
    if(validate_min_length % 1 === 0) {
      this.validate_field[i].min_length = validate_min_length;
    } else {
      console.log('Use a number in the validate_min_length attributes');
    }
  }
};

/**
* On submiting the form
*/

Validate.prototype.onSubmitCheck = function() {
  this.submit = this.form.find('input[type="submit"]');
  var that = this;
  this.submit.on('click', function(e) {
    for(var i = 0; i < that.validate_field.length; i++) {
      if(that.validate_field[i].type === 'select-one') {
        if(that.checkIfValid(i)) that.checkValidSelect(i);
      } else {

        if(that.checkIfValid(i)) that.checkValidRequired(i);
        if(that.checkIfValid(i)) that.checkValidLength(i);
        if(that.checkIfValid(i)) that.checkValidEmail(i);

        if(typeof that.validate_field[i].compare_with != 'undefined') {
           if(that.checkIfValid(i)) that.checkValidCompare(i);
        }
      }
      if(!that.validate_field[i].eventChangeListenerAdded) that.addChangeListener(i);
      that.setClass(i);
    }
    if(that.checkAllFields()) e.preventDefault(); // Only submits when all fields are valid

    for(var j = 0; j < that.validate_field.length; j++) {
      that.setValid(j, true);
    }
  });
};

/**
* Added the change listener to the input fields
*/

Validate.prototype.addChangeListener = function(i) {
  var that = this;
  this.validate_field[i].addEventListener('change' ,function(){
    if(that.validate_field[i].type === 'select-one') {
      if(that.checkIfValid(i)) that.checkValidSelect(i);
    } else {
      if(that.checkIfValid(i)) that.checkValidRequired(i);
      if(that.checkIfValid(i)) that.checkValidLength(i);
      if(that.checkIfValid(i)) that.checkValidEmail(i);
      if(typeof that.validate_field[i].compare_with != 'undefined') {
         if(that.checkIfValid(i)) that.checkValidCompare(i);
      }
    }
    that.setClass(i);
    that.setValid(i, true);
  });

  this.validate_field[i].eventChangeListenerAdded = true;
};

/**
* Check if the required field has a value
*/

Validate.prototype.checkValidRequired = function(i) {
  if(this.validate_field[i].value === '') {
    this.setValid(i, false);
    if(this.options.use_error_message) this.setErrorMessage(i, this.options.msg_required);
  } else  {
    this.setValid(i, true);
    this.removeErrorMessage(i);
  }
};

/**
*
*/

Validate.prototype.checkValidLength = function(i) {
  if(typeof this.validate_field[i].min_length !== 'undefined') {
    if(this.validate_field[i].value.length >= this.validate_field[i].min_length) {
      this.setValid(i, true);
      this.removeErrorMessage(i);
    } else  {
      this.setValid(i, false);
      if(this.options.use_error_message) this.setErrorMessage(i, this.options.msg_min_length + this.validate_field[i].min_length);
    }
  }
};

/**
* Check valid email
*/

Validate.prototype.checkValidEmail = function(i) {
  if (this.validate_field[i].type === 'email') {
    var regularExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regularExp.test(this.validate_field[i].value)) {
      this.setValid(i, true);
      this.removeErrorMessage(i);
    } else {
      this.setValid(i, false);
      if(this.options.use_error_message) this.setErrorMessage(i, this.options.msg_email);
    }
  }
};

/**
* Check if the compare is valid
*/

Validate.prototype.checkValidCompare = function(i) {
  if(this.validate_field[i].value === this.validate_field[this.validate_field[i].compare_with].value) {
    this.setValid(i, true);
    this.setValid(this.validate_field[i].compare_with, true);
    this.setClass(this.validate_field[i].compare_with, true);
    this.removeErrorMessage(i);
    this.removeErrorMessage(this.validate_field[i].compare_with);
  } else {
    this.setValid(i, false);
    if(this.options.use_error_message) this.setErrorMessage(i, this.options.msg_compare);
  }
};

/**
* Check select value
*/

Validate.prototype.checkValidSelect = function(i) {
  if(this.validate_field[i].selectedIndex !== 0) {
    this.setValid(i, true);
    this.removeErrorMessage(i);
  } else {
    this.setValid(i, false);
    if(this.options.use_error_message) this.setErrorMessage(i, this.options.msg_required);
  }
};

/**
* Set the class to the input field
*/

Validate.prototype.setClass = function(i) {
  if(this.validate_field[i].valid) {
    this.validate_field[i].className = this.validate_field[i].old_class_name + ' validate-notice';
  } else  {
    this.validate_field[i].className = this.validate_field[i].old_class_name + ' validate-error';
  }
};

/**
* Check if input is valid
*/

Validate.prototype.checkIfValid = function(i) {
  return this.validate_field[i].valid;
};

/**
* Check all values
*/

Validate.prototype.checkAllFields = function() {
  for(var i = 0; i < this.validate_field.length; i++) {
    if(!this.validate_field[i].valid) {
      this.setFocus(i);
      return true;
    } else if (i === this.validate_field.length - 1) {
      return false;
    }
  }
};

/**
* Set focus to first invalid input
*/

Validate.prototype.setFocus = function(i) {
  this.validate_field[i].focus();
};

/**
* Sets the error message for the input
*/

Validate.prototype.setErrorMessage = function(i, msg) {
  if(document.getElementById('validate-error-message-' + i) === null) {
    var message = document.createElement('div');
    message.id = 'validate-error-message-' + i;
    message.className = 'validate-error-message';
    message.innerHTML = msg;

    document.getElementById(this.form[0].id).appendChild(message);

    var validate_field = this.validate_field[i];
    if(this.validate_field[i].offsetTop === 0) {
      validate_field = this.validate_field[i].parentElement;
    }
    var positionTop = validate_field.offsetTop - (message.clientHeight + 2);
    var positionLeft = validate_field.offsetLeft + validate_field.offsetWidth - message.clientWidth;

    message.style.top = positionTop + 'px';
    message.style.left = positionLeft + 'px';
  }
};

Validate.prototype.removeErrorMessage = function(i) {
  var element = document.getElementById('validate-error-message-' + i);
  if(element !== null) element.remove();
};
