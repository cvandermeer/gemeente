var ready;

ready = function() {

	$('.js_modal').on('click', function(e) {
		initModal()
	});

	$('.js_modal').on('ajax:success', function(e, data, status) {
		modalOnAjax(data)
	});

	$('.modal-close').on('click', function() {
		removeModal()
	});
}

function initModal() {
	var modalBackground = '<div class="modal-background"></div>'
	if($('.modal-background').length == 0) {
   	$('body').append(modalBackground)
  }
  setTimeout(function() {
    $('.modal-background').addClass('active')
  	$('.modal-background').bind('click', function() {
			removeModal();
		});
  }, 100);
}

function modalOnAjax(data) {
	if ($('.modal').find('form').length == 0) {
		$('.modal-content').append(data)
	}
	bindAjax();
	setTimeout(function() {
		$('.modal').addClass('active')
	}, 100);
}

function removeModal() {
	$('.modal-content').html('')
	$('.modal-background, .modal').removeClass('active')
}

function bindAjax() {
	$('.modal form').on('ajax:success', function(e, data, status) {
		if ($.type(data) == 'string') {
			$('.modal-content').html(data)
			bindAjax();
		} else {
			
			if($('.new_event').length > 0) {
				// Function located in events_maps.js
				setEvent(false, data)
			}
			if($('.edit_event').length > 0) {
				// Function located in events_maps.js
				setEvent(true, data)
			}
			removeModal()			
		}
	});
}

$(document).ready(ready);
$(document).on('page:load', ready);