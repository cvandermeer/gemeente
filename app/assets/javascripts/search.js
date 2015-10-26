var street_list_position = 0;

function triggerStreetSearch() {
  var timer;

  preventStreetSearchFromSubmitting()

  $('.js_street_input').on('keyup', function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      $('.street_list').remove();
    }
    var el = $('.js_street_input');
    if (0 > $.inArray( e.which, [37, 38, 39, 40, 13])) {
      street_list_position = 0;
      if (el.val().length > 2) {
        clearInterval(timer)
        timer = setTimeout(function() {
          $('.js_search_streets input[name="search"]').val($('.js_street_input').val())
          $('.js_search_streets').submit()
        }, 500);
      }
    } else if ($('.street_list').length > 0) {
      navigatingTroughStreetList(el, code)
    }
  });

  ajaxStreetSearch()
}

function ajaxStreetSearch() {
  $('.js_search_streets').bind('ajax:success', function(e, data, status) {
    $('.street_list').remove()
    var el = $('.js_street_input');
    var list = '<ul class="street_list">'
    if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        list += '<li>' + data[i] + '</li>'
      }
    list += '</ul>'
    }
    el.after(list)
    streetInListIsClicked(el)
  });
}

function navigatingTroughStreetList(el, code) {
  // Move down in street_list
  if (code == 38) {
    street_list_position -= 1
    if (street_list_position < 1) {
      street_list_position = $('.street_list li').length
    }
  } else if (code == 40) {
    // Move up in street_list
    street_list_position += 1
    if (street_list_position > $('.street_list li').length) {
      street_list_position = 1
    }
  }
  el.val($('.street_list li:nth-child('+ street_list_position +')').text())
  $('.street_list li:nth-child('+ street_list_position +')').addClass('focus').siblings().removeClass('focus')
}

function streetInListIsClicked(el) {
  $('.street_list li').on('click', function(e) {
    el.val($(this).text())
    el.focus()
    $('.street_list').remove()
  });
}

function preventStreetSearchFromSubmitting() {
  $('.js_street_input').on('keyup keypress', function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      e.preventDefault();
      return false;
    }
  });
}
