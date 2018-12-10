/*
 * tmtools.js
 * Copyright 2018
 */

/*
 * Copy all elements from 'arrSrc' to 'arrDes'
 * @param
 *		srcSrc : Source array which the values will be copied from
 *		srcDes : Destination array which the values will be copied to.
 */
function ArrayDeepCopy (arrSrc, arrDes) {
	if ( arrSrc.length != arrDes.length ) return;
	for ( var i = 0; i < arrSrc.length; i++ ) arrDes[i] = arrSrc[i];
}

//===============================================================================================================
/*
 * (Root/Parent) Constructor 'Objekt' (global)
 */
var Objekt = function (/* double[3], vektor */ position, /* string */ bezeichnung) {
	this.position = [0,0,0]; this.bezeichnung = "";
	if ( arguments.length > 0 ) {
		ArrayDeepCopy(position, this.position);
		if ( arguments.length > 1 ) this.bezeichnung = bezeichnung;
	}
};

Objekt.prototype.getBezeichnung = function () {
	return this.bezeichnung;
};

Objekt.prototype.setBezeichnung = function (/* string */ bezeichnung) {
	this.bezeichnung = bezeichnung;
};

Objekt.prototype.setPosition = function (/* double[3], vektor */ position) {
	ArrayDeepCopy(position, this.position);
};

//===============================================================================================================
/*
 * Constructor 'Kraft'. Inherits from 'Objekt'.
 */
var Kraft = function (/* double */ betrag, /* double[3], vektor */ richtung, /* double[3], vektor */ angriffspunkt, /* string */ bezeichnung) {
	this.betrag = 0; this.richtung = [0,0,0];
	if ( arguments.length == 0 ) {
		// Call the root/parent constructor 'Objekt'. That 'this' is the current 'Kraft' object which calls its parent (Objekt).
		Objekt.call(this);
	}
	else {
		this.betrag = betrag;
		if ( arguments.length < 3 ) Objekt.call(this);
		else {		
			if ( arguments.length == 3 ) Objekt.call(this, angriffspunkt);
			else Objekt.call(this, angriffspunkt, bezeichnung);
		}
	}
}; 
Kraft.prototype = Object.create(Objekt.prototype); // Subclass 'Kraft' inherits from parent class 'Objekt'
Kraft.prototype.constructor = Kraft;

/*
 * Methods of 'Kraft'
 */
Kraft.prototype.getBetrag = function () {
	return this.betrag;
};

Kraft.prototype.setAngriffspunkt = function (/* double[3], vektor */ angriffspunkt) {
	this.setPosition(angriffspunkt);
};

Kraft.prototype.setBetrag = function (/* double */ betrag) {
	this.betrag = betrag;
};

Kraft.prototype.setRichtung = function (/* double[3], vektor */ richtung) {
	ArrayDeepCopy(richtung, this.richtung);
};

//===============================================================================================================
/*
 * Constructor 'Auflager'. Inherits from 'Objekt'.
 */
var Auflager = function (/* unsigned short int */ wertigkeit, /* double[3], vektor */ position, /* string */ bezeichnung) {
	this.wertigkeit = ( arguments.length == 0 ) ? 0 : wertigkeit;
	if ( arguments.length < 2 ) {
		// Call the root/parent constructor 'Objekt'. That 'this' is the current 'Auflager' object which calls its parent (Objekt).
		Objekt.call(this);
	}
	else {
		( arguments.length == 2 ) ? Objekt.call(this, position) : Objekt.call(this, position, bezeichnung);
	}
};
Auflager.prototype = Object.create(Objekt); // Subclass 'Auflager' inherits from parent class 'Objekt'
Auflager.prototype.constructor = Auflager;

/*
 * Methods for 'Auflager'
 */
Auflager.prototype.getWertigkeit = function () {
	return this.wertigkeit;
};

Auflager.prototype.setWertigkeit = function (/* unsigned short int */ wertigkeit) {
	this.wertigkeit = wertigkeit;
};

//===============================================================================================================
/*
 * (Child) constructor 'Loslager' of parent 'Auflager'.
 */
var Loslager = function (/* double[3], vektor */ position, /* string */ bezeichnung) { // Loslager ist querverschieblich
	if ( arguments.length == 0 ) {
		// Call the parent constructor (Auflager). That 'this' is the current Loslager object which calls its parent (Auflager) and assigns the 'wertigkeit' value 1.
		Auflager.call(this, 1);
	}
	else { // arguments.length >= 1
		( arguments.length == 1 ) ? Auflager.call(this, 1, position) : Auflager.call(this, 1, position, bezeichnung);
	}
	this.kraft = new Kraft(0, [0,0,0], position, bezeichnung);
};
Loslager.prototype = Object.create(Auflager);  // Subclass 'Loslager' inherits from parent class 'Auflager'
Loslager.prototype.constructor = Loslager;

//===============================================================================================================
/*
 * Child constructor 'Festlager' of parent 'Auflager'.
 */
var Festlager = function (/* double[3], vektor */ position, /* string */ bezeichnung) {
	if ( arguments.length == 0 ) {
		// Call the parent constructor (Auflager). That 'this' is the current Loslager object which calls its parent (Auflager) and assigns the 'wertigkeit' value 1.
		Auflager.call(this, 2);
	}
	else { // arguments.length >= 1
		( arguments.length == 1 ) ? Auflager.call(this, 2, position) : Auflager.call(this, 2, position, bezeichnung);
	}
};
Festlager.prototype = Object.create(Auflager);  // Subclass 'Festlager' inherits from parent class 'Auflager'
Festlager.prototype.constructor = Festlager;

//===============================================================================================================
/*
 * Child constructor 'Einspannung' of parent 'Auflager'.
 */
var Einspannung = function () {};
 
//===============================================================================================================
/*
 * Constructor 'Balken'
 */
var Balken = function ( /* double */ laenge, /* double[3], vektor */ startPosition, /* string */ bezeichnung) {
	this.laenge = ( arguments.length == 0 ) ? 0 : laenge;
	if ( arguments.length < 2 ) { Objekt.call(this); }
	else { ( arguments.length == 2 ) ? Objekt.call(this, startPosition) : Objekt.call(this, startPosition, bezeichnung); } 
};

//===============================================================================================================
var F1 = new Kraft();
F1.setBezeichnung("F1");
console.log("Kraft: " + F1.getBezeichnung() + " = " + F1.getBetrag());

var F2 = new Kraft(3, [1,1,1], [2,2,2], "F2");
console.log("Kraft: " + F2.getBezeichnung() + " = " + F2.getBetrag());