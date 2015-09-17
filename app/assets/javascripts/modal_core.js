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
	$('.new_event').on('ajax:success', function(e, data, status, xhr){
    $('.events').append(xhr.responseText);
    removeModal();
  });
	setTimeout(function() {
		$('.modal').addClass('active')
	}, 100);
}

function removeModal() {
	$('.modal-content').html('')
	$('.modal-background, .modal').removeClass('active')
}

$(document).ready(ready);
$(document).on('page:load', ready);