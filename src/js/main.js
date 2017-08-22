var log = console.log;
;(function($){
	console.log('Include is main.js');
	var _w = $(window);




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

		/*Menu show/hide*/
		$('.item-menu.catalog').hover(function(){
			if( _w.width()>992 ) $(this).find('.wr-catalog').stop().fadeIn();
		},function(){
			if( _w.width()>992 ) $(this).find('.wr-catalog').stop().fadeOut();
		})
		$('.item-menu.catalog>.link-item-menu').click(function(e){
			e.preventDefault();
			if( _w.width()< 992){
				$(this).parents('.catalog').find('.wr-catalog').slideToggle();
			}
		});
		$('.nav-line .close.v1').click(function(){
			$(this).parents('.nav-line').css({'left':'100%'});
			$('.menu-btn').toggleClass('tcon-transform');
		});
		$('.menu-btn').click(function(){
			$('.nav-line').css({'left':0});
			$(this).toggleClass('tcon-transform');
		});


		/*Search show/hide string*/
		$('.search-btn').click(function(){
			$('.string-search').fadeToggle();
			$(this).toggleClass('tcon-transform');
		});

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
			$('.item-tab.active').stop().fadeOut(function(){
				$(this).removeClass('active');
				$( _.data('tab') ).stop().fadeIn(function(){
					$(this).addClass('active');
				});
			});
		});




		/*Pay One Click init*/
		$('#pay-one-click').click(function(){
			$(this).add('#add-bascket,.bookmark').fadeOut(function(){
				$('#input-phone,#make-order').stop().fadeIn(function(){});
				$('.close.v1').css('display','inline-block');
			});
		});
		$('.bl-order .close.v1').click(function(){
			$(this).add('#input-phone,#make-order').fadeOut(function(){
				$('#pay-one-click,#add-bascket').stop().fadeIn();
				$('.bookmark').css('display','inline-block');
			});
		});




		/*item-faq init*/
		$('.item-faq').click(function(){
			$(this).toggleClass('active').find('.answer').slideToggle();
		});




		/*#city init*/
		$('#city').click(function(){
			$(this).parents('.bl-city').find('.bl-search-city').stop().fadeIn(function(){ $('.bl-search-city').addClass('active')});
		});
		$('.bl-city .list-city .item-city').click(function(){
			var _=$(this);
			$('#city').text( _.text() );
			$('.bl-search-city').stop().fadeOut(function(){ $(this).removeClass('active')})
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
		$('.enlarge-count').click(function(e){
			e.preventDefault();
			var count = $(this).parents('.bl-count').find('.count .fi-d');
			count.val( parseInt(count.val()) + 1);
		});
		$('.reduce-count').click(function(e){
			e.preventDefault();
			var count = $(this).parents('.bl-count').find('.count .fi-d');
			if( parseInt(count.val()) > 1 ) count.val( parseInt(count.val()) - 1);
		});
		var cardItemTemplate = function(_){
			var _c = $('#template .item-card').clone();
			_c.attr('id',_.id);
			_c.find('.img').css({'background-image':_.img});
			_c.find('.title-card').text(_.title);
			_c.find('.price').text(_.price + 'руб.');
			_c.find('.old-price').text(_.oldprice + 'руб.');
			_c.find('.fi-d').val(_.count);
			return _c;
		};
		//
		var basketBadget = $('#bascket-badget');
		Basket.init(function(_){
			_.getCard().forEach(function(el,id,arr){
				$('.bl-card.another-card').append(cardItemTemplate(el));
			});
			if( !!_.getCountCard() ) basketBadget.fadeIn().text( _.getCountCard() );
			else basketBadget.fadeOut();
		});

		// New events changeBasket
		var changeBasket = new Event('changeBasket');
		document.addEventListener('changeBasket', function (e) {
			if( !!Basket.getCountCard() ) basketBadget.fadeIn().text( Basket.getCountCard() );
			else basketBadget.fadeOut();
		}, !1);

		$('.btni.bascket').click(function(e){
			var _ = $(this).parents('.item-card');
			var el = {
				id:_.data('id'),
				title:_.find('.title-card').text(),
				img:_.find('.img').css('background-image').replace(/url\(\"|\"\)/gi,''),
				count:1,
				price:_.find('.price').text(),
				oldprice:_.find('.old-price').text()
			};
			if( Basket.addCard(el) ){
				$('.bl-card.another-card').append( $('.bl-card.current-card').find('.item-card') );
				$('.bl-card.current-card').html(cardItemTemplate(el));
			}else{
				$('.bl-card.another-card').find('#'+el.id);
			}
			if( $('.bl-card.another-card').children().length ) $('.title-another-card').fadeIn();
			else $('.title-another-card').fadeOut();
			document.dispatchEvent(changeBasket);
		});
		$('#add-bascket').click(function(e){
			var _ = $(this).parents('.main-info');
			var el = {
				id:_.data('id'),
				title:_.find('.title-card').text(),
				img:_.find('img').attr('src'),
				count:_.find('.bl-count .count .fi-d').val(),
				price:_.find('.price').text(),
				oldprice:_.find('.old-price').text() || 0
			};
			Basket.addCard(el);
			$('.bl-card.current-card').html(cardItemTemplate(el));
			document.dispatchEvent(changeBasket);
		});


		if($('.fotorama').length){
			console.log('Fotorama init');
			$('.fotorama').fotorama({
				'minwidth':'80%',
				'maxwidth':'100%',
				'ratio':'18/15',
				'allowfullscreen':true,//Полноэкранный режим
				'nav':'thumbs',
				'transition':'dissolve',
				'keyboard':true,
				'arrows':'always',
				'fit':'scaledown',
				'thumbheight':85,
				'thumbwidth':85,
				'thumbmargin':40,
				'thumbfit':'scaledown',
			});
		}
	}); /*end document.ready*/




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
