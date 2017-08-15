console.log('Include Basket.js');
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD module
		define(factory);
	} else if (typeof exports === 'object') {
		// CommonJS-like environment (i.e. Node)
		module.exports = factory();
	} else {
		// Browser global
		root.Basket = factory();
	}
}(this || window, function () {
	'use strict';
	var Basket = {};
	var Card = function(id,name,img,count,price,oldprice){
		if(id instanceof Object) Object.assign(this, id);
		else{
			this.id = id;
			this.name = name || 'Без имени';
			this.img = img || '/img/none.jpg';
			this.count = parseInt(count) || 1;
			this.price = parseInt(price) || 1;
			this.oldprice = parseInt(oldprice) || 0;
		}
	};
	Card.prototype.getTotal = function(){
		return this.price * this.count;
	};
	var LS = {
		set: function(name,data){ localStorage.setItem(name,JSON.stringify(data) ); },
		get: function(name){ return JSON.parse( localStorage.getItem(name) ); },
		clear: function(){ localStorage.clear(); }
	};
	Basket.card = [];
	Basket.total = 0;
	Basket.count = 0;
	Basket.init = function(){
		console.log('Basket init');
		log(LS.get('Basket'));
		if(LS.get('Basket')){
			Object.assign( Basket,LS.get('Basket') );
			Basket.card.forEach(function(el,index,arr){arr[index] = new Card(el);});
		}else this.change();
	};
	Basket.getCard = function(id_card){
		if(id_card) return this.card.filter(function(el){return el.id === id_card}).shift();
		else return this.card;
	};
	Basket.getTotal = function(){return this.total;};
	Basket.change = function(){
		LS.set('Basket',{
			count: this.changeCount(),
			total: this.changeTotal(),
			card: this.card
		});
	};
	Basket.changeTotal = function(){
		switch( this.card.length ){
			case 0: return 0;
			case 1: return this.total = this.card[0].getTotal();
			default: return (this.total = this.card.reduce( function( sum, el ){
				sum = parseInt( sum )? sum: sum.getTotal();
				return sum + el.getTotal();
			}));
		}
	};
	Basket.changeCount = function(){
		switch( this.card.length ){
			case 0: return 0;
			case 1:return this.total = this.card[0].count;
			default: return (this.total = this.card.reduce( function( sum, el ){
				sum = parseInt( sum )? sum: sum.count;
				return sum + el.count;
			}));
		}
	};
	Basket.addCard = function(id,name,img,count,price,oldprice){
		this.card.push(new Card(id,name,img,count,price,oldprice));
		this.change();
		return this.card[id];
	};
	Basket.changeCard = function(id,count){
		this.change();
		return (this.card[id].count = count);
	};
	Basket.removeCard = function(id_card){
		this.card = this.card.filter(function(el,index,arr){
			return el.id !== parseInt(id_card);
		});
		this.change();
	};
	Basket.clear = function(){
		LS.clear();
	};
	return Basket;
}));
Basket.init();

/*
Basket.addCard(13,'Икра стерляди Горкунов, 50 г','/img/product-1.png',2,'1800 руб.');
Basket.addCard(15,'Икра стерляди Горкунов, 50 г','/img/product-1.png',2,'1800 руб.');
Basket.addCard(16,'Икра стерляди Горкунов, 50 г','/img/product-1.png',2,'1800 руб.');
log(Basket.getTotal());
log(Basket.getCard());
Basket.removeCard(15);
log(Basket.getCard());
log(Basket.getTotal());
Basket.removeCard(16);
log(Basket.getCard());
log(Basket.getTotal());*/