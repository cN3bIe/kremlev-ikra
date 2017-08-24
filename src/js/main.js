var log = console.log;
;(function($){
	console.log('Include is main.js');
	var _w = $(window);




	console.log('Waves init');
	Waves.init();
	Waves.attach('.moveup', ['waves-circle', 'waves-float']);
	Waves.attach('.btn', ['waves-button', 'waves-float','waves-light']);
	Waves.attach('.ribe', ['waves-block', 'waves-float']);




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


		console.log('SocialShareKit init');
		SocialShareKit.init();



		/*Links by bookmark & basket page*/
		var bookmarkLink = $('.top-line .bookmark').attr('href');
		var basketLink = $('.top-line .basket').attr('href');

		var bookmarkAJAX = function(id){
			$.get(bookmarkLink+'?ajax&id='+id)
			.done(function(data){
				log('Success bookmark');
			}).fail(function(data){
				log('Fail bookmark');
			});
		};

		var basketAJAX = function(id,count = 1){
			$.get(basketLink+'?ajax&id='+id+'&count='+count)
			.done(function(data){
				log('Success basket');
			}).fail(function(data){
				log('Fail basket');
			});
		};


		/*Menu show/hide*/
		$('.item-menu.catalog').hover(function(){
			if( _w.width()>992 ) $(this).find('.wr-catalog').stop().fadeIn();
		},function(){
			if( _w.width()>992 ) $(this).find('.wr-catalog').stop().fadeOut();
		})
		$('.item-menu.catalog>.link-item-menu').click(function(e){
			if( _w.width()< 992){
				e.preventDefault();
				$(this).parents('.catalog').find('.wr-catalog').slideToggle();
			}
		});
		$('.nav-line .close.v1').click(function(){
			$(this).parents('.nav-line').css({'left':'100%'});
			// $('.menu-btn').toggleClass('tcon-transform');
		});
		$('.menu-btn').click(function(){
			$('.nav-line').css({'left':0});
			// $(this).toggleClass('tcon-transform');
		});

		$('.btn-filter').click(function(){
			$('.form-filter').stop().slideToggle();
		});



		/*Search show/hide string*/
		$('.search-btn').click(function(){
			$('.string-search').stop().fadeToggle();
			$(this).toggleClass('tcon-transform');
			$('.wr-fetch').fadeToggle();
		});


		/*Change hit on sale if they are together */
		var _bn = $('.bl-notice');
		if( _bn.length ){
			_bn.each(function(index,el){
				var _bn = $(el);
				var _bn_bh = _bn.find('.badget-hit');
				var _bn_bs = _bn.find('.badget-sale');
				if( _bn_bh.length && _bn_bs.length ){
					_bn_bs.hide();
					setInterval(function(){
						_bn_bh.add(_bn_bs).fadeToggle();
					},2000);
				}
			});
		}

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
		/*$('.form-filter input[type="checkbox"]').change(function(){
			var _=$(this);
			$('.filter-popup').stop().fadeOut(function(){
				$(this).css({
					'top': _.parents('.mdl-checkbox').position().top
				}).stop().fadeIn();
			});
		});*/
		console.log('Isotop init');
		if( $('.catalog.catalog-page').length ){
			var $grid = $('.wr-card').isotope({
				itemSelector: '.wr-item-card',
				layoutMode: 'fitRows',
			});
			var _filter = [];
			$('.form-filter input').change(function(){
				var _filt_str = [];
				var _ = $(this);
				var _p = _.parents('.bl-filter');
				var filterName = _p.data('filter-group');
				var filterLvL = _p.data('filter-lvl');
				_p.find('input').each(function(id,el){
					if( $(el).prop("checked") ) _filt_str.push( $(el).parents('label').data('filter') );
				});

				_filter[filterLvL] = _filt_str;
				_filter_str = _filter.reduce(function(ac,arr){
					if( !ac.length ) return arr;
					if( !arr.length ) return ac;
					else{
						var new_ar = [];
						ac.forEach(function(acV){
							arr.forEach(function(arrV){
								new_ar.push(acV+arrV);
							});
						});
						return new_ar;
					}
				},[]).join();
				$grid.isotope({
					filter: _filter_str
				});
			});
		}


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
			$(this).add('#add-basket,.main-info .bookmark').stop().fadeOut(function(){
				$('#input-phone,#make-order').stop().fadeIn(function(){});
				$('.close.v1').css('display','inline-block');
			});
		});
		$('.bl-order .close.v1').click(function(){
			$(this).add('#input-phone,#make-order').stop().fadeOut(function(){
				$('#pay-one-click,#add-basket').stop().fadeIn();
				$('.main-info .bookmark').css('display','inline-block');
			});
		});




		/*item-faq init*/
		$('.item-faq').click(function(){
			$(this).toggleClass('active').find('.answer').stop().slideToggle();
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
				citySelect.stop().fadeOut(function(){ $(this).removeClass('active')});
			}
		});




		if( $('.iziModal').length ){
			console.log('iziModal init');
			$('.iziModal').iziModal({
				width: 1100,
			});
			$('.btni.basket').click(function(e){
				e.preventDefault();
				$('.iziModal').iziModal('open');
			});
		}


		var btnInit = function(jq){
			// Увеличивает счетчик товара на 1ед
			jq.find('.enlarge-count').click(function(e){
				e.preventDefault();
				var count = $(this).parents('.bl-count').find('.count .fi-d');
				count.val( parseInt(count.val()) + 1);
			});
			// Уменьшает счетчик товара на 1ед
			jq.find('.reduce-count').click(function(e){
				e.preventDefault();
				var count = $(this).parents('.bl-count').find('.count .fi-d');
				if( parseInt(count.val()) > 1 ) count.val( parseInt(count.val()) - 1);
			});
			// Удалить товар
			jq.find('.bl-del').click(function(){
				var _ = $(this);
				var _p = _.parents('.item-card').stop().fadeOut(function(){
					$(this).remove();
					if( $('.bl-card.another-card').children('.item-card').length ) $('.title-another-card').stop().fadeIn();
				});
				Basket.removeCard(_p.attr('id'));
				basketAJAX(_p.data('id'),0);
				$('.total .sale .price').text( Basket.getOldTotal() - Basket.getTotal() + ' руб.' );
				$('[data-id*="'+_p.attr('id')+'"]').find('.btni.basket').removeClass('active');
				document.dispatchEvent(BasketBookmark);
			});


			// Изменение счетчика и автоматический расчет
			var totalCard = function(){
				var _ = $(this).parents('.item-card');
				var card = Basket.changeCard( _.attr('id'), _.find('.bl-count .count .fi-d').val() );
				if(card){
					_.find('.price-total').text( card.getTotal() + ' руб.');
					basketAJAX(card.id,card.count);
					$('.total .bl-total .price').text( Basket.getTotal() + ' руб.' );
				}
			};
			jq.find('.count .fi-d').on('input change',function(){ totalCard.apply(this); });
			jq.find('.enlarge-count,.reduce-count').click(function(){ totalCard.apply(this); });
			return jq;
		};
		btnInit($('body'));

		var cloneCardTemplate = function(_){
			var _c = $('#template .item-card').clone();
			_c.attr('id',_.id);
			_c.find('.img').css('background-image','url('+_.img+')');
			_c.find('.title-card').text(_.title);
			_c.find('.fi-d').val(_.count);
			_c.find('.price-card').text(_.price + ' руб.');
			_c.find('.price-total').text( _.price * _.count + ' руб.');
			_c.find('.oldprice-card').text(_.oldprice + ' руб.');
			return _c;
		};
		// Bookmark & Basket init functional
		var basketBadget = $('#basket-badget');
		var bookmarkBadget = $('#bookmark-badget');

		Basket.init(function(_){
			_.getCard().forEach(function(el,id,arr){
				$('.bl-card.another-card').append( btnInit( cloneCardTemplate( el ) ) );
			});
			if( !!_.getCountCard() ){
				basketBadget.stop().fadeIn().text( _.getCountCard() );
				basketBadget.parents('.basket').addClass('active');
			}else basketBadget.stop().fadeOut().parents('.basket').removeClass('active');
			_.getCard().forEach(function(el){
				$('[data-id*="'+el.id+'"]').find('.btni.basket').addClass('active');
			});
		});
		Bookmark.init(function(_){
			if( !!_.getCountCard() ){
				bookmarkBadget.stop().fadeIn().text( _.getCountCard() );
				bookmarkBadget.parents('.bookmark').addClass('active');
			}else bookmarkBadget.stop().fadeOut().parents('.bookmark').removeClass('active');
			_.getCard().forEach(function(id){
				$('[data-id*="'+id+'"]').find('.btni.bookmark').addClass('active');
			});
		});

		// New events BasketBookmark
		var BasketBookmark = new Event('BasketBookmark');
		document.addEventListener('BasketBookmark', function (e) {
			if( !!Basket.getCountCard() ){
				basketBadget.stop().fadeIn().text( Basket.getCountCard() );
				basketBadget.parents('.basket').addClass('active');
			}else{
				basketBadget.stop().fadeOut().parents('.basket').removeClass('active');
			}
			if( !!Bookmark.getCountCard() ){
				bookmarkBadget.stop().fadeIn().text( Bookmark.getCountCard() );
				bookmarkBadget.parents('.bookmark').addClass('active');
			}else{
				bookmarkBadget.stop().fadeOut().parents('.bookmark').removeClass('active');
			}
			$('.total .bl-total .price').text( Basket.getTotal() + ' руб.' );
		}, !1);

		//Additing product in bookmark
		$('.btni.bookmark').click(function(e){
			e.preventDefault();
			var _ = $(this).toggleClass('active').parents('.item-card,.main-info');
			Bookmark.addCard(_.data('id'));
			bookmarkAJAX(_.data('id'));
			document.dispatchEvent(BasketBookmark);
		});
		//Additing product in basket
		$('.btni.basket').click(function(e){
			var _ = $(this).addClass('active').parents('.item-card');
			var el = Basket.nobj(
				_.data('id'),
				_.find('.title-card').text(),
				_.find('.img').css('background-image').replace(/url\(\"|\"\)/gi,''),
				1,
				_.find('.price').text(),
				_.find('.old-price').text()
			);
			basketAJAX(_.data('id'));
			if( Basket.addCard(el) ){
				var clone = cloneCardTemplate(el);
				btnInit(clone);
				$('.bl-card.another-card').append( $('.bl-card.current-card').find('.item-card') );
				$('.bl-card.current-card').append( clone );
			}else{
				var cur_el = $('.bl-card.another-card').find('#'+el.id);
				if( cur_el.length ){
					$('.bl-card.another-card').append( $('.bl-card.current-card').find('.item-card') );
					$('.bl-card.current-card').append( cur_el );
				}
			}
			if( $('.bl-card.another-card').children('.item-card').length ) $('.title-another-card').stop().fadeIn();
			else $('.title-another-card').stop().fadeOut();
			document.dispatchEvent(BasketBookmark);
		});
		$('#add-basket').click(function(e){
			var _ = $(this).parents('.main-info');
			var el = Basket.nobj(
				_.data('id'),
				_.find('.title-card').text(),
				_.find('img').attr('src'),
				_.find('.bl-count .count .fi-d').val(),
				_.find('.price').text(),
				_.find('.old-price').text()
			);
			basketAJAX(_.data('id'));
			Basket.addCard(el);
			$('.bl-card.current-card').html(cloneCardTemplate(el));
			document.dispatchEvent(BasketBookmark);
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


		// AJAX подгрузка новостей
		$('.btni.more-blog').click(function(e){
			e.preventDefault();
			var _ = $(this);
			$.get('/blog/?ajax&page='+_.data('page')).done(function(data){
				$('.more-bl').append( data );
			}).fail(function(data){
				log('Fail');
			});
		});
		// AJAX поиск товаров
		$query = !1;
		$query_str = '';
		$('.string-search input').on('input',function(e){
			$query_str = $(this).val();
			$query = !0;
		});
		setInterval(function(){
			if( $query ){
				var _ = $('.wr-fetch');
				$.get( '/?s='+$query_str ).done(function(data){
					_.html( data );
				}).fail(function(data){
					log('Fail');
				});
				$query = !1;
			}
		},1000);



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
