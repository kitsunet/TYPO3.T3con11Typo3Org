(function($) {
				// Calculate fixed tabs width
				$.fn.calculateTabsWidth = function() {

				$(this).each(function() {

					var o = $(this);
					var list = $(o).find('li');
					var oWidth = o.outerWidth(true);

					o.parent().width(oWidth); // fix for FF4 :)

					var tabsNo = $(list).length;
					tabsNo = (tabsNo == 0) ? 1 : tabsNo;

					var tabsWidth = 0, addWidth = 0, mod = 0, counter = 0;

					$(list).each(function() {
						tabsWidth += $(this).outerWidth(true);
					});

					mod = (oWidth - tabsWidth) % tabsNo;
				    addWidth = (oWidth - mod - tabsWidth) / tabsNo;

				    $(list).each(function() {

						newWidth = (counter < mod) ? $(this).width() + addWidth + 1 : $(this).width() + addWidth;

						$(this).css({'width': newWidth});
						$(this).find('a').css({'width': newWidth-1}); // for IE7 fix

					    counter++;
				    });

				});

				}
})(jQuery);


(function($) {
				// Accordion
				$.fn.accordion = function() {

					$(this).find('> .a-body').each(function(){
						$(this).data('height', $(this).height());
					});

					$(this).find('> .a-h:not(.open)').addClass('closed')
					    .next().hide().css('height',0);

					$(this).find('> .a-h').click(function(){
					  if($(this).hasClass('closed')){
					    var domCurrent = $(this);
					    var intCurrentHeight = domCurrent.next().data('height');
					    var domOpened = $(this).siblings('.open');

					    domOpened.addClass('closed').removeClass('open')
					        .next().animate({'height': 0}, function() {$(this).hide()});
					    domCurrent.removeClass('closed').addClass('open')
					        .next().show().animate({'height': intCurrentHeight});
					  }
					});

				}
})(jQuery);

(function($) {
// Social box
$.fn.socialBox = function() {

	var o = $(this),
		$body = o.find('.b-social-body'),
		$opened = o.find('.b-social-opened'),
		$closed = o.find('.b-social-closed'),
		$toggle = o.find('.b-social-toggle'),
		o_height = $opened.height(),
		o_closed_height = $closed.height(),
		sOpenedClass = 'b-social-open',
		sClosedClass = 'b-social-close';

	$closed.css('position', 'absolute');

	if(o.hasClass(sOpenedClass)) {
		$closed.hide();
	} else {
		$body.height(o_closed_height);
		$opened.hide();
	}

	$toggle.click(function(){
		if(o.hasClass(sOpenedClass)){
			$closed.fadeIn();
			$opened.fadeOut();

			$body.animate({'height': o_closed_height});
			o.removeClass(sOpenedClass).addClass(sClosedClass);
		} else {
			$closed.fadeOut();
			$opened.fadeIn();

			$body.animate({'height': o_height});
			o.addClass(sOpenedClass).removeClass(sClosedClass);
		}
	});

}
})(jQuery);

$(document).ready(function(){

				$('body').removeClass('js-off');

				$.tools.tabs.addEffect("default", function(tabIndex, done) {	// Removed display none for inactive tabs
					this.getPanes().removeClass('show-tab').addClass('hide-tab').eq(tabIndex).removeClass('hide-tab').addClass('show-tab');
					done.call();
				});

				$(".tabs:not(.lite-tabs)").tabs("> .tab-panes > div", {tabs: 'li', current: 'act'}).calculateTabsWidth();


				// Home page Main Scroller/ Tabs
				if ($('#top-slider').length > 0) {

					$('#top-slider .slider-nav').tabs('#top-slider .slides > .slide', {tabs: 'li', current: 'active', effect: 'fade', fadeInSpeed: 1000, fadeOutSpeed: 1000, rotate: true}).slideshow({autoplay:true});

						// Stop the slider and click event when a button in the slider is clicked
					$('#top-slider .slides > .slide a.bu').click(function() {
						var slider = $('#top-slider .slider-nav').tabs('#top-slider .slides > .slide');
						slider.data('slideshow').stop();
						slider.data('tabs').getCurrentTab().addClass('active');
						location.href = $(this).attr('href');
						return false;
					});

					// var api = $('#top-slider .slider-nav').data("tabs");
					//
					// 					api.onBeforeClick(function() {
					// 				    	$('#top-slider .slider-content	').css({'background': '#FFF'});
					// 					});
					//
					// 					var fadeTimeout = 5000; // 5 seconds
					//
					// 					function makeCarousel() {
					// 				    	api.next();
					// 						timer = setTimeout(makeCarousel, fadeTimeout);
					// 					}
					//
					// 					var timer = setTimeout(makeCarousel, fadeTimeout);
					//
					// 					$('#top-slider .slider').mouseover(function() {
					// 						clearTimeout(timer);
					// 					}).mouseleave(function() {
					// 						timer = setTimeout(makeCarousel, fadeTimeout);
					// 					});
				}
				// END Home page Main Scroller/ Tabs

				if ($('#small-slider').length > 0) {
						$("#small-slider .slider-content").scrollable({circular: true, next: '.slider-nav .next', prev: '.slider-nav .prev'}).autoscroll({interval:4000});
						$('.slider-nav .next, .slider-nav .prev').click(function() { return false; })
				}

				if ($('.ticker-slider').length > 0) {
					//$(".ticker-slider .slider-content").scrollable({circular: true}).autoscroll({interval:3000});
					$('.ticker-slider .slider-nav').tabs('.slide', {tabs: 'li', current: 'active', effect: 'fade', fadeInSpeed: 1000, fadeOutSpeed: 1000, rotate: true}).slideshow({autoplay:true});
				}

				$('.accordion').accordion();

				//Cufon.replace('h1', { fontFamily: 'Share-Bold' });
				Cufon.replace('.b-numbers li, .b-numbers h4, .b-numbers p, .b-numbers h3, .b-communities-text, .b-social-closed', { fontFamily: 'Share-Italic' });
				Cufon.replace('h1, .d h2, .d h3, .d h4, .d h5, .user-welcome h5, form legend, .con-data', { fontFamily: 'Share-Regular' });

				// Social block on homepage
				$('.b-social').socialBox();

				// character counter
				$('.character-counter').each(function(){
					var data = $.metadata.get(this);
					$(this).jqEasyCounter({
						maxChars: data.maxCharacters,
						maxCharsWarning: data.maxCharacters - 10,
						msgFontColor: '',
						msgFontFamily: '',
						msgFontSize: '',
						msgWarningColor: '#e90100'
					});
				});
});