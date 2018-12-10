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

Objekt.prototype.getBezeichnung = function () { return this.bezeichnung; };
Objekt.prototype.getPosition = function () { return this.position; };
Objekt.prototype.getX = function () { return this.position[0]; };
Objekt.prototype.getY = function () { return this.position[1]; };
Objekt.prototype.getZ = function () { return this.position[2]; };
Objekt.prototype.setBezeichnung = function (/* string */ bezeichnung) {	this.bezeichnung = bezeichnung; };
Objekt.prototype.setPosition = function (/* double[3], vektor */ position) { ArrayDeepCopy(position, this.position); };

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
Kraft.prototype.getBetrag = function () { return this.betrag; };
Kraft.prototype.setAngriffspunkt = function (/* double[3], vektor */ angriffspunkt) { this.setPosition(angriffspunkt); };
Kraft.prototype.setBetrag = function (/* double */ betrag) { this.betrag = betrag; };
Kraft.prototype.setRichtung = function (/* double[3], vektor */ richtung) {	ArrayDeepCopy(richtung, this.richtung); };

//===============================================================================================================
/*
 * Constructor 'Moment'. Inherits from 'Objekt'.
 * @param: 
 *		drehrichtung : +1 (positiv, gegen Uhrzeigersinn), -1 (negativ, in Uhrzeigersinn)
 */
var Moment = function (/* double */ betrag, /* short int */ drehrichtung, /* double[3], vektor */ position, /* string */ bezeichnung) {
	this.betrag = 0; this.drehrichtung = 1; // default
	var argc = arguments.length;
	if ( argc == 0 ) {
		// Call the root/parent constructor 'Objekt'. That 'this' is the current 'Kraft' object which calls its parent (Objekt).
		Objekt.call(this);
	}
	else {
		this.betrag = betrag;
		if ( argc == 1 ) Objekt.call(this);
		else {
			this.drehrichtung = drehrichtung;
			( argc == 2 ) ? Objekt.call(this) : ( argc == 3 ) ? Objekt.call(this, position) : Objekt.call(this, position, bezeichnung);
		}
	}
};
Moment.prototype = Object.create(Objekt);
Moment.prototype.constructor = Moment;

Moment.prototype.getBetrag = function () { return this.betrag; };
Moment.prototype.getDrehrichtung = function () { return this.drehrichtung; };
Moment.prototype.setBetrag = function (betrag) { this.betrag = betrag; };
Moment.prototype.setDrehrichtung = function (drehrichtung) { this.drehrichtung = drehrichtung; };
 
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
Auflager.prototype.getWertigkeit = function () { return this.wertigkeit; };
Auflager.prototype.setWertigkeit = function (/* unsigned short int */ wertigkeit) { this.wertigkeit = wertigkeit; };

//===============================================================================================================
/*
 * Child constructor 'Loslager' of parent 'Auflager'.
 */
var Loslager = function (/* double[3], vektor */ position, /* string */ bezeichnung) { // Loslager ist querverschieblich
	if ( arguments.length == 0 ) {
		// Call the parent constructor (Auflager). That 'this' is the current Loslager object which calls its parent (Auflager) and assigns the 'wertigkeit' value 1.
		Auflager.call(this, 1);
	}
	else { // arguments.length >= 1
		( arguments.length == 1 ) ? Auflager.call(this, 1, position) : Auflager.call(this, 1, position, bezeichnung);
	}
	this.kraft = new Kraft(1, [0,1,0], position, bezeichnung); // vertikale Kraft
};
Loslager.prototype = Object.create(Auflager);  // Subclass 'Loslager' inherits from parent class 'Auflager'
Loslager.prototype.constructor = Loslager;

Loslager.prototype.getKraft = function () {	return this.kraft; };
Loslager.prototype.getKraftbetrag = function () { return this.kraft.getBetrag(); };

//===============================================================================================================
/*
 * Child constructor 'Festlager' of parent 'Auflager'.
 */
var Festlager = function (/* double[3], vektor */ position, /* string */ bezeichnung) {
	if ( arguments.length == 0 ) {
		// Call the parent constructor (Auflager). That 'this' is the current Festlager object which calls its parent (Auflager) and assigns the 'wertigkeit' value 2.
		Auflager.call(this, 2);
	}
	else { // arguments.length >= 1
		( arguments.length == 1 ) ? Auflager.call(this, 2, position) : Auflager.call(this, 2, position, bezeichnung);
	}
	this.kraftHorizontal = new Kraft(1, [1,0,0], position, bezeichnung + "_H"); // horizontale Kraft
	this.kraftVertikal = new Kraft(1, [0,1,0], position, bezeichnung + "_V"); // vertikale Kraft
};
Festlager.prototype = Object.create(Auflager);  // Subclass 'Festlager' inherits from parent class 'Auflager'
Festlager.prototype.constructor = Festlager;

Festlager.prototype.getKraftHorizontal = function () { return this.kraftHorizontal; };
Festlager.prototype.getKraftVertikal = function () { return this.kraftVertikal; };
Festlager.prototype.getKraftHorizontalBetrag = function () { return this.kraftHorizontal.getBetrag(); };
Festlager.prototype.getKraftVertikalBetrag = function () { return this.kraftVertikal.getBetrag(); };

//===============================================================================================================
/*
 * Child constructor 'Einspannung' of parent 'Auflager'.
 */
var Einspannung = function (/* double[3], vektor */ position, /* string */ bezeichnung) {
	if ( arguments.length == 0 ) {
		// Call the parent constructor (Auflager). That 'this' is the current Einspannung object which calls its parent (Auflager) and assigns the 'wertigkeit' value 3.
		Auflager.call(this, 3);
	}
	else { // arguments.length >= 1
		( arguments.length == 1 ) ? Auflager.call(this, 3, position) : Auflager.call(this, 3, position, bezeichnung);
	}
	this.kraftHorizontal = new Kraft(1, [1,0,0], position, bezeichnung + "_H"); // horizontale Kraft
	this.kraftVertikal = new Kraft(1, [0,1,0], position, bezeichnung + "_V"); // vertikale Kraft
	this.moment = new Moment(1, 1, position, "M_" + bezeichnung);
};
Einspannung.prototype = Object.create(Auflager);
Einspannung.prototype.constructor = Einspannung;

Einspannung.prototype.getKraftHorizontal = function () { return this.kraftHorizontal; };
Einspannung.prototype.getKraftVertikal = function () { return this.kraftVertikal; };
Einspannung.prototype.getMoment = function () { return this.Moment; };
 
//===============================================================================================================
/*
 * Constructor 'Balken'. Inherits from 'Objekt'.
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