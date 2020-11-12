'use strict';

console.log("Connected");

$(() => {
	// Navbar fade scrolling
	$(document).scroll(() => {
		let $nav = $('#mainNavbar');
		$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	});

	// Button functionality
	$('.addBtn').click(() => {
		$('.addBtn').css('display', 'none');
		$('.addContent').css('display', 'block');
	});

	$('.cancelContentBtn').click(() => {
		$('.addBtn').css('display', 'block');
		$('.addContent').css('display', 'none');
	});

	$('.img-fluid').click((e) => {
		let $id = e.target.id;
		$('#zoomImg' + $id).css('display', 'block');
		$('.imgBackDrop').css('display', 'block');
	});

	$('.testClose').click((button) => {
		let $id = button.target.id;
		$('#zoomImg' + $id).css('display', 'none');
		$('.imgBackDrop').css('display', 'none');
	});

	// Toggle work and regular form
	$('#formType').click(() => {
		$('#form1').toggle();
		$('#form2').toggle();
	});
});

$(document).ready(() => {
	let path = window.location.pathname;

	// If on home page
	if (path == '/') {
		$('.home').show();
	} else {
		$('.home').hide();
	}

	// Dynamic Navbar
	if (path == `CMS EDIT PATH HERE`) {
		let text = $('.editForm').attr('id');
		$('.editForm').text(text);
	}

	$(window).width();
});

// Slide in transition for Projects section
$(document).ready(function() {
	$(window).scroll( function(){
		let winBot = $(this).scrollTop() + $(this).innerHeight();
		$('#firstsection').each(function() {
			let curObjBot = $(this).offset().top + $(this).outerHeight();
			if (curObjBot < winBot + 400) {
				if ($(this).css('opacity') == 0) {
					$(this).fadeTo(500, 1);
				}
			} else {
				if ($(this).css('opacity') == 1) {
					$(this).fadeTo(500, 0);
				}
			}
		});
		$('#secsection').each(function() {
			let curObjBot = $(this).offset().top + $(this).outerHeight();
			if (curObjBot < winBot + 400) {
				if ($(this).css('opacity') == 0) {
					$(this).fadeTo(500, 1);
				}
			} else {
				if ($(this).css('opacity') == 1) {
					$(this).fadeTo(500, 0);
				}
			}
		});
		$('#lastSection').each(function() {
			let curObjBot = $(this).offset().top + $(this).outerHeight();
			if (curObjBot < winBot + 500) {
				if ($(this).css('opacity') == 0) {
					$(this).fadeTo(500, 1);
				}
			} else {
				if ($(this).css('opacity') == 1) {
					$(this).fadeTo(500, 0);
				}
			}
		});
		$('.fromleft').each( function(i){		 
			var bottom_of_element = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			if( bottom_of_window > bottom_of_element - 500 ){
				$(this).css({
					'transform': 'translateX(0%)',
					'opacity': '1',
					'transition-duration': '800ms'
				});
			}
		});
		$('.fromRight').each( function(i){		 
			var bottom_of_element = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			if( bottom_of_window > bottom_of_element  - 500){
				$(this).css({
					'transform': 'translateX(0%)',
					'opacity': '1',
					'transition-duration': '800ms'
				});
			}
		});
	});
});