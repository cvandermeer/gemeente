var ready;

/**
 * Sets the value of the Select2 field on page newsletters
 * and changes the location of the url with the id of the community
 * @return {boolean}
 */

ready = function() {
  $('#gemeente').on('change', function () {
     var url = "/communities/" + $(this).val() + '/news';
      if (url) {
          window.location.replace(url);
      }
      return false;
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
