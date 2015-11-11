// Variable that contains the postion in the search list
var list_position = 0;

/**
  * @desc sets all functions for the street search
  * @return a key pressed and submits the form for street search
*/

function triggerStreetSearch() {
  // Prevents the new and edit report from submitting
  preventStreetSearchFromSubmitting();

  // Sets and clears the setTimeout function
  var timer;

  $('.js_street_input').on('keyup', function(e) {
    var code = e.keyCode || e.which;
    removeSearchListOnEnter('street', code);

    if (0 > $.inArray( e.which, [37, 38, 39, 40, 13])) {
      list_position = 0;
      if ($(this).val().length > 2) {
        clearInterval(timer);
        timer = setTimeout(function() {
          $('.js_search_streets input[name="search"]').val($('.js_street_input').val());
          $('.js_search_streets').submit();
        }, 500);

      }
    } else if ($('.street_list').length > 0) {
      navigatingTroughStreetList($(this), code, 'street');
    }
  });

  ajaxStreetOurTownSearch('street', $('.js_street_input'));
}

/**
  * @desc binds the onclick function to the form to submit the form for town search
*/

function triggerTownSearch() {
  $('.js_town_input').on('keyup', function(e) {
    var code = e.keyCode || e.which;
    removeSearchListOnEnter('town', code);

    if (0 > $.inArray( e.which, [37, 38, 39, 40, 13])) {
      list_position = 0;
    } else if ($('.town_list').length > 0) {
      navigatingTroughStreetList($(this), code, 'town');
    }
  });

  $('.js_town_input').on('focus', function() {
    if ($('.town_list').length === 0) {
      $('.js_search_towns input[name="search"]').val($('.js_street_input').val())
      $('.js_search_towns').submit()
      list_position = 0
    }
    ajaxStreetOurTownSearch('town', $('.js_town_input'))
  });
}

/**
  * @desc sets the data for the search list on ajax success
  * @param string name - for street our town
  * @param element el - the input field $(this)
  * @return the data json in a list under the input field
*/

function ajaxStreetOurTownSearch(name, el) {
  $('.js_search_'+name+'s').bind('ajax:success', function(e, data, status) {
    if (data.length > 0) {
      $('.'+name+'_list').remove()
      var el = $('.js_'+name+'_input');
      var list = '<ul class="'+name+'_list">'
      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          list += '<li>' + data[i] + '</li>'
        }
      list += '</ul>'
      }
      el.after(list)
      streetInListIsClicked(el, name)
    }
  });
}

/**
  * @desc sets the position in the search list on keyup our keydown
  * @param element el - the input field $(this)
  * @param integer code - number of the key pressed
  * @param string name - for street our town
  * @return a new position in the search list and sets the value for the input field
*/

function navigatingTroughStreetList(el, code, name) {
  // Move down in street_list
  if (code == 38) {
    list_position -= 1
    if (list_position < 1) {
      list_position = $('.'+name+'_list li').length
    }
  } else if (code == 40) {
    // Move up in street_list
    list_position += 1
    if (list_position > $('.'+name+'_list li').length) {
      list_position = 1
    }
  }
  el.val($('.'+name+'_list li:nth-child('+ list_position +')').text())
  $('.'+name+'_list li:nth-child('+ list_position +')').addClass('focus').siblings().removeClass('focus')
}

/**
  * @desc sets the value in the input form onclick in the list
  * @param element el - the input field $(this)
  * @param string name - for street our town
  * @return removes the list and sets the focus on the input
*/

function streetInListIsClicked(el, name) {
  $('.'+name+'_list li').on('click', function(e) {
    el.val($(this).text())
    el.focus()
    $('.'+name+'_list').remove()
  });
}

/**
  * @desc prevents the form from submitting on enter
  * @return false if the key pressed is enter
*/

function preventStreetSearchFromSubmitting() {
  $('.new_report, .edit_report').on('keyup keypress', function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      e.preventDefault();
      return false;
    }
  });
}

/**
  * @desc removes the list on enter
  * @param string name - for street our town
  * @param integer code - number of the key pressed
*/

function removeSearchListOnEnter(name, code) {
  if (code == 13 && $('.'+name+'_list').length > 0) {
    $('.'+name+'_list').remove();
  }
}
