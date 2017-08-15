var log = console.log;
;(function($){
	console.log('Include is main.js');




	console.log('Waves init');
	Waves.init();
	Waves.attach('.moveup', ['waves-circle', 'waves-float']);
	Waves.attach('.btn', ['waves-button', 'waves-float','waves-light']);
	Waves.attach('.ribe', ['waves-block', 'waves-float']);




	console.log('SocialShareKit init');
	SocialShareKit.init();
/*
	console.log('Lazy init');
	$(".lazy").lazy({
		effect: "fadeIn",
		effectTime: 2000,
		threshold: 0,
		enableThrottle: true,
		throttle: 250,
		// delay: 2000
	});
	*/
	$(document).ready(function(){
		console.log('Document ready');

		$('.tcon').click(function(){
			$('.string-search').fadeToggle();
			$(this).toggleClass('tcon-transform');
		});
		$()

		/*Mask phone init*/
		$('.phone').mask('+7 (000) 000-00-00').click(function(){ if(!$(this).val()) $(this).val('+7 ('); });

		/*Link-move init*/
		$('.link-move').click(function(e){
			$('html,body').animate({'scrollTop':$($(this).data('move')).offset().top-20},"slow");
			e.preventDefault();
		});
		var
		handleResize = function(){
		},
		handleScroll = function(){
			var sw = $(this).scrollTop();
			if( sw > 200 ) $('#moveup').removeClass('scale-out');
			else $('#moveup').addClass('scale-out');
		};




		/*handleScroll init*/
		handleScroll();
		$(window).scroll(handleScroll);




		/*handleResize init*/
		handleResize();
		$(window).resize(handleResize);




		/*form-filter change init*/
		$('.form-filter input[type="checkbox"]').change(function(){
			var _=$(this);
			$('.filter-popup').fadeOut(function(){
				$(this).css({
					'top': _.parents('.mdl-checkbox').position().top
				}).fadeIn();
			});
		});




		/*textarea init*/
		$('.form-textarea').each(function(index, el){
			var _ = $(el);
			var _h = _.outerHeight();
			_.on('input',function(e){
				var _sc = _[0].scrollHeight;
				// console.log(_h,_sc);
				if( _h !== _sc){
					_.css( 'height', _sc );
					_h=_sc;
				}
			});
		});




		/*Tab init*/
		$('.item-control-tab').click(function(){
			var _ = $(this);
			_.siblings('.item-control-tab').removeClass('active');
			if(_.hasClass('active')) return;
			_.addClass('active');
			$('.item-tab.active').fadeOut(function(){
				$(this).removeClass('active');
				$( _.data('tab') ).fadeIn(function(){
					$(this).addClass('active');
				});
			});
		});




		/*Pay One Click init*/
		$('#pay-one-click').click(function(){
			$(this).add('#add-bascket,.bookmark').fadeOut(function(){
				$('#input-phone,#make-order').fadeIn(function(){});
				$('.close.v1').css('display','inline-block');
			});
		});
		$('.close.v1').click(function(){
			$(this).add('#input-phone,#make-order').fadeOut(function(){
				$('#pay-one-click,#add-bascket').fadeIn();
				$('.bookmark').css('display','inline-block');
			});
		});




		/*item-faq init*/
		$('.item-faq').click(function(){
			$(this).toggleClass('active').find('.answer').slideToggle();
		});




		/*#city init*/
		$('#city').click(function(){
			$(this).parents('.bl-city').find('.bl-search-city').fadeIn(function(){ $('.bl-search-city').addClass('active')});
		});
		$('.bl-city .list-city .item-city').click(function(){
			var _=$(this);
			$('#city').text( _.text() );
			$('.bl-search-city').fadeOut(function(){ $(this).removeClass('active')})
		});



		/*close*/
		$(document).click(function(e){
			e = e || window.event;
			target = e.target || e.srcElement;
			var _=$(target).parents('.bl-search-city');
			var citySelect = $('.bl-search-city').first()
			if( !_.length && citySelect.hasClass('active') ){
				citySelect.fadeOut(function(){ $(this).removeClass('active')});
			}
		});



		if( $('.iziModal').length ){
			console.log('iziModal init');
			$('.iziModal').iziModal({width: 1100});
			$('.btni.bascket').click(function(e){
				e.preventDefault();
				$('.iziModal').iziModal('open');
			});
		}
	});




	/*ymaps init*/
	ymaps.ready(function(){
		$('#city').text( ymaps.geolocation.city || 'Санкт-Петербург' );
		/*
		log( ymaps.geocode('Москва').then(function(res){
			log(res);
		}) );
		*/
	});

})(jQuery);