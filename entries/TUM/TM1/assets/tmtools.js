/*
 * tmtools.js
 * Copyright 2018
 */

// Fuer Interface werdem keine Prototyp-Funktionen der Form "<class_name>.prototype.<function_name> = function () {..}"
// wie { getters, setters } definiert. Alles innerhalb des var-Rumpfes bzw. der var-Klammern {..} (d.h. 
// var <IName> = function () {..}) sind Properties (Eigenschaften).

//=======================//
//		Interface        //
//=======================//
//===============================================================================================================
var IKraft = function (/* float */ betrag) {
	this.betrag = ( arguments.length != 0 ) ? betrag : 0;
	this.richtung = { rx : 0, ry : 0, rz : 0 }; // Richtungsvektor
	// Some properties as functions
	this.getBetrag = function () { return this.betrag; }; // usage: this.getBetrag()
};

//===============================================================================================================
var IMoment = function (/* float */ betrag, /* unsigned short int */ drehsinn) {
	this.betrag = ( betrag != undefined ) ? betrag : 0;
	this.drehsinn = ( drehsinn != undefined ) ? drehsinn : 1; // +1 : nach links, -1 nach rechts (drehend)
};


//=======================//
//			Class        //
//=======================// 
//===============================================================================================================
var Objekt = function () {
	this.x = 0; this.y = 0; this.z = 0;
};
// getters, setters (methods)
Objekt.prototype.getX = function () { return this.x; };
Objekt.prototype.getY = function () { return this.y; };
Objekt.prototype.getZ = function () { return this.z; };
Objekt.prototype.setPosition = function (/* float */ x, /* float */ y, /* float */ z) {
	this.x = x; this.y = y; this.z = z; 
};
Objekt.prototype.setX = function (x) { this.x = x; };
Objekt.prototype.setY = function (y) { this.y = y; };
Objekt.prototype.setZ = function (z) { this.z = z; };

//===============================================================================================================
var Kraft = function (/* float */ betrag) {
	this.typ = "Kraft";
	Objekt.call(this); // 'Kraft' uses all properties of 'Objekt'
	IKraft.call(this, betrag); // 'Kraft' uses all properties of 'IKraft'
};
Kraft.prototype = Object.create(Objekt.prototype); // 'Kraft' is subclass of only 'Objekt' and inherits methods 
Kraft.prototype.constructor = Kraft;               // only from 'Objekt' too

//===============================================================================================================
var Moment = function (/* float */ betrag, /* unsigned short int */ drehsinn) {
	this.typ = "Moment";
	Objekt.call(this);
	IMoment.call(this, betrag, drehsinn); // 'Moment' uses the properties of 'IMoment'
};
Moment.prototype = Object.create(Objekt.prototype); // 'Moment' is subclass of only 'Objekt' and inherits methods
Moment.prototype.constructor = Moment;              // only from 'Objeckt' too

//===============================================================================================================
var Komponent = function (/*string */ bezeichnung) {
	this.bezeichnung = ( bezeichnung != undefined ) ? bezeichnung : "";
	// Call the parent constructor 'Objekt'. That 'this' is the 'Komponent' object which calls its parent (Objekt).
	Objekt.call(this); // 'Komponent' uses all properties of 'Objekt'
};
Komponent.prototype = Object.create(Objekt.prototype); // subclass 'Komponent' inherits from superclass 'Objekt'.
Komponent.prototype.constructor = Komponent; // creates constructor 'Komponent'.
// getters, setters (methods)
Komponent.prototype.getBezeichnung = function () { return this.bezeichnung; };
Komponent.prototype.setBezeichnung = function (/* string */ bezeichnung) { this.bezeichnung = bezeichnung; };


//===============================================================================================================
var Lager = function (/* uint */ wertigkeit, /* string */ bezeichnung) {
	this.typ = "Lager";
	Komponent.call(this, bezeichnung);
	this.wertigkeit = ( wertigkeit != undefined ) ? wertigkeit : 0;
};
Lager.prototype = Object.create(Komponent.prototype);
Lager.prototype.constructor = Lager;

//===============================================================================================================
var Loslager = function Loslager (/* string */ bezeichnung) { // querverschieblich
	Lager.call(this, 1, bezeichnung);
	this.typ = "Loslager";
	this.kraft = new IKraft(0);	
};
Loslager.prototype = Object.create(Lager.prototype);
Loslager.prototype.constructor = Loslager;

//===============================================================================================================
var Festlager = function Loslager (/* string */ bezeichnung) {
	Lager.call(this, 2, bezeichnung);
	this.typ = "Festlager";
	this.kraft = new IKraft(0); // Horizontal
	this.kraft2 = new IKraft(0); // Vertikal
};
Festlager.prototype = Object.create(Lager.prototype);
Festlager.prototype.constructor = Festlager;

//===============================================================================================================
var Einspannung = function Einspannung (/* string */ bezeichnung) {
	Einspannung.call(this, 3, bezeichnung);
	this.typ = "Einspannung";
	this.kraft = new IKraft(0); // Horizontal
	this.kraft2 = new IKraft(0); // Vertikal
	this.moment = new IMoment(0, 1);
};
Einspannung.prototype = Object.create(Lager.prototype);
Einspannung.prototype.constructor = Einspannung;

//===============================================================================================================
var Balken = function ( /* double */ laenge, /* string */ bezeichnung) {
	Komponent.call(this, bezeichnung);
	this.typ = "Balken";
	this.laenge = ( laenge != undefined ) ? laenge : 0;
};
Balken.prototype = Object.create(Komponent.prototype);
Balken.prototype.constructor = Balken;

//===============================================================================================================
var System = function () {
	Objekt.call(this);
	this.Components = [];
	this.Components.add = function (c) { this.push(c); };
	this.validate = function () {
		if ( this.Components.length != 0 ) {
			// Gleichgewichtsbedingung: ->
			this.Components.forEach(function (c) {
				switch (c.typ) {
					case Festlager:
						break;
					default:
						break;
				}
			});
			//                          ^
			// Gleichgewichtsbedingung: |
			this.Components.forEach(function (c) {
				switch (c.typ) {
					case 
				}
			});
		}
	};
};

//===============================================================================================================
var C1 = new Komponent();
console.log("C1.x : " + C1.x);
C1.setPosition(1,2,3);
console.log("C1.setPosition(1,2,3)");
console.log("C1.x : " + C1.x);
var F1 = new Kraft(3);
console.log("var F1 = new Kraft(3)");
console.log("Kraft F1.y : " + F1.y);
F1.setPosition(1,2,3);
console.log("F1.setPosition(1,2,3)");
console.log("Kraft F1.y : " + F1.y);
console.log("Kraft F1.getY() : " + F1.getY());
console.log("Kraft F1.betrag : " + F1.betrag);
console.log("Kraft F1.getBetrag() : " + F1.getBetrag());
console.log("Kraft F1.richtung.rx : " + F1.richtung.rx);
F1.richtung.x = 1;
console.log("Kraft F1.richtung.rx : " + F1.richtung.rx);
var M1 = new Moment();
console.log("var M1 = new Moment()");
console.log("M1.x : " + M1.x);
console.log("M1.drehsinn : " + M1.drehsinn);
var A = new Loslager();
console.log("var A = new Loslager()");
console.log("Loslager A.x : " + A.x);
console.log("Loslager A.bezeichnung : " + A.bezeichnung);
console.log("Loslager A.getBezeichnung() : " + A.getBezeichnung());
A.setBezeichnung("A");
console.log("Loslager A.bezeichnung : " + A.bezeichnung);
console.log("Loslager A.getBezeichnung() : " + A.getBezeichnung());
console.log("typeof A : " + (typeof A) );
console.log("A.typ : " + A.typ );