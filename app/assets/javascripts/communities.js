var ready;

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
