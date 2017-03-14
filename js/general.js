// Custom General jQuery
$(document).ready(function(){
	// Variables
	wWidth = $(window).width();
	var menuIcon = $('#menu_icon');
	menu = $('#navigation');
	var menuOpen = $('#navigation.open');
	var menuClosed = $('#navigation.closed');

	$(window).resize(function() {
		wWidth = $(window).width();
	});

	// Add mobile menu
	$('#page_header .wrap').append('<div id="menu_icon"></div>');

	// If <= IE 8 tell the user to upgrade
	$('audio').prepend("<!--[if lte IE 8]><p>Your browser is out of date. Please upgrade to listen to audio.</p><![endif]-->");

	// Show/hide transcript on click
	$('.show_transcript').click(function(e){
		e.preventDefault();
		$(this).next('.transcript').slideToggle();

		// Change class appropriately
		if($(this).hasClass('closed')){
			$(this).removeClass('closed');
			$(this).addClass('open');
		} else if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(this).addClass('closed');
		}
	});

	// Functions
	// Move logo position depending on screen size
	function logoMove(){
		if(wWidth < 983.5){
			$('#logo').insertAfter('footer span');
		} else if(wWidth > 983.5){
			$('#logo').insertAfter('#page_header a');
		}
	}

	// Toggle menu and classes
	function mobileMenu(){
		menu.slideToggle();
		// Change class appropriately
		if(menu.hasClass('closed')){
			menu.removeClass('closed');
			menu.addClass('open');
		} else if(menu.hasClass('open')){
			menu.removeClass('open');
			menu.addClass('closed');
		}
	}

	// jQuery ui tabs hack to fix relative paths
	makeTabs = function(el) {
	    $( el )
	        .find( "ul a" ).each( function() {
	            var href = $( this ).attr( "href" ),
	                newHref = window.location.protocol + '//' + window.location.hostname +
	                    window.location.pathname + href;

	            if ( href.indexOf( "#" ) == 0 ) {
	                $( this ).attr( "href", newHref );
	            }
	        })
	    $( el ).tabs({active:0});
	};

	// Scroll to top
	$('.back_to_top').click(function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '500');
	});

	// Initialize tabs
	makeTabs('.tabs');
	// $('.tabs').tabs({active:0});


	// Move logo
	logoMove();
	$(window).resize(function() {
		logoMove();
	});

	// Mobile menu
	$('#menu_icon').click(function() {
		mobileMenu();
	});

	// =======Main Navigation Menu==========================================================
	// Start with mobile menu closed
	$('#navigation').addClass('closed');

	// Give first level class'
	$('#navigation li').each(function() {
		if(!$(this).parent().hasClass('sub_menu')){
			if($(this).children().length > 1){
				if($(this).children('a').hasClass('active')){
					$(this).children('a').addClass('open');
					$(this).children('.sub_menu').css('display', 'block');
				} else{
					$(this).children('a').addClass('closed');
				}
				$(this).children('a').addClass('level_1');
			}
		}
	});

	// On click show or hide sub menu
	$('.level_1').click(function(e){
		// Define variables
		var menus = $('.sub_menu');
		var this_menu = $(this).parent().children('.sub_menu');
		var links = $('.level_1.open');
		var this_link = $(this);

		// Prevent link default action
		e.preventDefault();

		// Close all open menus excluding this one
		// Change open class to closed
		if($('.level_1').hasClass('open')){
			menus.not(this_menu).slideUp();
			$(links).not(this_link).removeClass('open').addClass('closed');
		}

		// Toggle clicked on menu
		$(this).parent().children('.sub_menu').slideToggle();

		// Change class appropriately
		if($(this).hasClass('closed')){
			$(this).removeClass('closed');
			$(this).addClass('open');
		} else if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(this).addClass('closed');
		}
	});
});