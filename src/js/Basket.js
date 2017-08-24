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
	var _ = {};
	var Card = function(obj){
		Object.assign(this, obj);
	};
	Card.prototype.getTotal = function(){
		return this.price * this.count;
	};
	Card.prototype.getOldTotal = function(){
		return this.oldprice * this.count;
	};
	var LS = {
		set: function(name,data){ localStorage.setItem(name,JSON.stringify(data) ); },
		get: function(name){ return JSON.parse( localStorage.getItem(name) ); },
		clear: function(){ localStorage.clear(); }
	};
	_.clean = function(){
		this.card = [];
		this.total = 0;
		this.count = 0;
	};
	_.init = function(callback){
		console.log('Basket init');
		this.clean();
		if(LS.get('Basket')){
			Object.assign( Basket,LS.get('Basket') );
			_.card.forEach(function(el,index,arr){arr[index] = new Card(el);});
		}else this.change();
		if(callback) callback.call(_,_);
	};
	_.nobj = function(obj,title,img,count,price,oldprice){
		if(obj instanceof Object) return {
			id: parseInt(obj.id) || 0,
			title: obj.title || 'Без имени',
			img: obj.img || '',
			count: parseInt(obj.count) || 0,
			price: parseInt(obj.price) || 0,
			oldprice: parseInt(obj.oldprice) || 0
		};
		else return {
			id: parseInt(obj) || 0,
			title: title || 'Без имени',
			img: img || '',
			count: parseInt(count) || 0,
			price: parseInt(price) || 0,
			oldprice: parseInt(oldprice) || 0
		};
	};
	_.getCard = function(id_card){
		if(id_card) return this.card.filter(function(el){return el.id === id_card}).shift();
		else return this.card;
	};
	_.getCountCard = function(){return this.card.length;};
	_.getCount = function(){return this.count;};
	_.getTotal = function(){return this.total;};
	_.getOldTotal = function(){return this.oldtotal;};
	_.change = function(){
		LS.set('Basket',{
			count: this.changeCount(),
			total: this.changeTotal(),
			oldtotal: this.changeOldTotal(),
			card: this.card
		});
	};
	_.changeCount = function(){
		switch( this.card.length ){
			case 0: return 0;
			case 1: return this.count = this.card[0].count;
			default: return (this.count = this.card.reduce( function( sum, el ){
				return sum + el.count;
			},0));
		}
	};
	_.changeTotal = function(){
		switch( this.card.length ){
			case 0: return 0;
			case 1: return this.total = this.card[0].getTotal();
			default: return (this.total = this.card.reduce( function( sum, el ){
				return sum + el.getTotal();
			},0));
		}
	};
	_.changeOldTotal = function(){
		switch( this.card.length ){
			case 0: return 0;
			case 1: return this.oldtotal = this.card[0].getOldTotal();
			default: return (this.oldtotal = this.card.reduce( function( sum, el ){
				return sum + el.getOldTotal();
			},0));
		}
	};
	_.addCard = function(){
		var obj = this.nobj.apply(this,arguments);
		if( this.card.length && this.card.some( function(e){ return e.id === obj.id} ) ){
			this.changeCard(obj.id, obj.count);
			return !1;
		}
		this.card.push(new Card(obj));
		this.change();
		return this.card.slice(-1);
	};
	_.changeCard = function(_id,count){
		if( !_id && !count) return !1;
		_id = parseInt( _id );
		count = parseInt( count );
		var ret;
		this.card.forEach(function(el,ind,arr){
			if( el.id === _id ) (ret = arr[ind]).count = count;
		});
		this.change();
		return ret;
	};
	_.removeCard = function(id_card){
		this.card = this.card.filter(function(el,index,arr){
			return el.id !== parseInt(id_card);
		});
		this.change();
	};
	_.clear = function(){
		LS.clear();
		this.clean();
		this.change();
	};
	return _;
}));
