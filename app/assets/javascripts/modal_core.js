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
		$('.modal-content').append(data)
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
	$('.modal-content').html('')
}

function bindAjax() {
	$('.new_event').on('ajax:success', function(e, data, status) {
		if ($.type(data) == 'string') {
			console.log(data)
			$('.modal-content').html(data)
			bindAjax();
		} else {

			removeModal()
		}
	});
}

$(document).ready(ready);
$(document).on('page:load', ready);