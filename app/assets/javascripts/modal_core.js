var ready;

ready = function() {

	$('.js_modal').on('ajax:success', function(e, data, status) {
		setDataInModal(data)
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
  	$('.modal').addClass('active')
    $('.modal-background').addClass('active')
  	$('.modal-background').bind('click', function() {
			removeModal();
		});
  }, 100);
}

function setDataInModal(data) {
	// Building the modal
	$('.modal-content').html(data)
	initModal()

	// The function can be found in /events_map.js
	newEventForm()
}

function removeModal() {
	$('.modal-background, .modal').removeClass('active')
}


$(document).ready(ready);
$(document).on('page:load', ready);