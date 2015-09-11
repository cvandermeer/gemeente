var ready;

ready = function() {

	var modalBackground = '<div class="modal-background"></div>'

	$('.js_modal').on('click', function(e) {
	
	  if($('.modal-background').length == 0) {
	   	$('body').append(modalBackground)
	  }
	  setTimeout(function() {

	    $('.modal-background').addClass('active')

    	$('.modal-background').bind('click', function() {
				removeModal();
			});

	  }, 100);

	});
	
	$('.js_modal').on('ajax:success', function(e, data, status) {

		if ($('.modal').find('form').length == 0) {
			$('.modal-content').append(data)
		}

		bindAjax();

		setTimeout(function() {
			$('.modal').addClass('active')
		}, 100);

	});

	$('.modal-close').on('click', function() {
		removeModal()
	});

}

function removeModal() {
	$('.modal-background, .modal').removeClass('active')
}

function bindAjax() {
	$('.modal form').on('ajax:success', function(e, data, status) {
		
		if ($.type(data) == 'string') {
		
			$('.modal-content').html(data)

			bindAjax();
		
		} else {

			removeModal()

			if($('.new_event').length > 0) {
				// Function location /events_maps.js
				setEvent(data)
			}

			$('.modal-content').html('')			
		
		}
	});
}

$(document).ready(ready);
$(document).on('page:load', ready);