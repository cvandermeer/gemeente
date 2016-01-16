/**
 * @desc Trigger the autocomplete on the input fields street and town,
 * @return {data.json} street and town names from search function
 */

function triggerAutocomplete() {
  var cache = {};
  $('.js_street_input').autocomplete({
    minLength: 3,
    source: function( request, response ) {
      var term = request.term;
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/search_streets",
        data: { 'search': term },
        success: function(data){
          cache[ term ] = data;
          response(data);
        }
      });
    }
  });

  $('.js_town_input').autocomplete({
    minLength: 3,
    source: function( request, response ) {
      var term = request.term;
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/search_towns",
        data: { 'search': term },
        success: function(data){
          cache[ term ] = data;
          response(data);
        }
      });
    }
  });
}
