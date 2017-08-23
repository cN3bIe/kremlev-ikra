console.log('Include Bookmark.js');
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Bookmark = factory();
	}
}(this || window, function () {
	'use strict';
	var _ = {};
	var LS = {
		set: function(name,data){ localStorage.setItem(name,JSON.stringify(data) ); },
		get: function(name){ return JSON.parse( localStorage.getItem(name) ); },
		clear: function(){ localStorage.clear(); }
	};
	_.clean = function(){
		this.card = [];
	};
	_.init = function(callback){
		console.log('Bookmark init');
		this.clean();
		if(LS.get('Bookmark')){
			Object.assign( Bookmark,LS.get('Bookmark') );
		}else this.change();
		if(callback) callback.call(_,_);
	};
	_.getCard = function(id_card){
		if(id_card) return this.card.filter(function(el){return el.id === id_card}).shift();
		else return this.card;
	};
	_.getCountCard = function(){return this.card.length;};
	_.change = function(){ LS.set( 'Bookmark',{ card: this.card } ); };
	_.addCard = function(_id){
		if( this.card.length && this.card.some( function(el){ return parseInt( el ) === parseInt( _id ); } ) ) return _.removeCard( _id );
		this.card.push( parseInt( _id ) );
		this.change();
		return this.card.slice( -1 );
	};
	_.removeCard = function( _id ){
		this.card = this.card.filter( function( el ){ return parseInt( el ) !== parseInt( _id ); } );
		this.change();
	};
	_.clear = function(){
		LS.clear();
		this.clean();
		this.change();
	};
	return _;
}));
