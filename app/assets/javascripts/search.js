// Variable that contains the postion in the search list
var list_position = 0;

/**
  * @desc sets all functions for the street search
  * @return a key pressed and submits the form for street search
*/

function triggerSearch() {
  // Prevents the new and edit report from submitting
  preventSearchFromSubmitting();

  // Sets and clears the setTimeout function
  var timer;

  $('.js_street_input, .js_town_input').on('keyup', function(e) {
    var code = e.keyCode || e.which;
    var name = $(this).attr('data-el-name');
    removeSearchListOnEnter(name, code);
    var elVal = $(this).val();
    if (0 > $.inArray( e.which, [37, 38, 39, 40, 13])) {
      list_position = 0;
      if (elVal.length > 2) {
        clearInterval(timer);
        timer = setTimeout(function() {
          ajaxSearch(name, elVal);
        }, 200);
      }
    } else if ($('.street_list, .town_list').length > 0) {
      navigatingTroughList($(this), code, name);
    }
  });
}

/**
  * @desc sets the data for the search list on ajax success
  * @param string name - for street our town
  * @param element el - the input field $(this)
  * @return the data json in a list under the input field
*/

function ajaxSearch(name, val) {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "/search_"+name+"s",
    data: { 'search': val },
    success: function(data){
      setSearchList(data, name);
    }
  });
}

function setSearchList(data, name) {
  if (data.length > 0) {
    $('.'+name+'_list').remove();
    var el = $('.js_'+name+'_input');
    var list = '<ul class="'+name+'_list">';
    if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        list += '<li>' + data[i] + '</li>';
      }
    list += '</ul>';
    }
    el.after(list);
    elInListIsClicked(el, name);
  }
}

/**
  * @desc sets the position in the search list on keyup our keydown
  * @param element el - the input field $(this)
  * @param integer code - number of the key pressed
  * @param string name - for street our town
  * @return a new position in the search list and sets the value for the input field
*/

function navigatingTroughList(el, code, name) {
  // Move down in street_list
  if (code == 38) {
    list_position -= 1;
    if (list_position < 1) {
      list_position = $('.'+name+'_list li').length;
    }
  } else if (code == 40) {
    // Move up in street_list
    list_position += 1;
    if (list_position > $('.'+name+'_list li').length) {
      list_position = 1;
    }
  }
  el.val($('.'+name+'_list li:nth-child('+ list_position +')').text());
  $('.'+name+'_list li:nth-child('+ list_position +')').addClass('focus').siblings().removeClass('focus');
}

/**
  * @desc sets the value in the input form onclick in the list
  * @param element el - the input field $(this)
  * @param string name - for street our town
  * @return removes the list and sets the focus on the input
*/

function elInListIsClicked(el, name) {
  $('.'+name+'_list li').on('click', function(e) {
    el.val($(this).text());
    el.focus();
    $('.'+name+'_list').remove();
  });
}

/**
  * @desc prevents the form from submitting on enter
  * @return false if the key pressed is enter
*/

function preventSearchFromSubmitting() {
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
