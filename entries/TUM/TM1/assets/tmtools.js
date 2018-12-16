/*
 * tmtools.js
 * Copyright 2018
 */

var m_Baukasten = function () {
	return {
		/*
 		 * Creates a multi-dimensional array.
 		 * Usage:
 		 *		createArray()    =>  Empty array []
 		 *		createArray(n)   =>  An one-dimensional array with n elements
 		 *		createArray(n,m) =>  An two-dimensional array with n elements.
 		 *									Each of n elements is an array with m elements itself. 
 		 */
		createArray : function (n) { // n : Number of elements in 1st dimension
			if ( arguments.length == 0 ) return []; // new Array()
			// Sparse array method (A=[]; A[size-1]=undef) is efficient.
			// Reference: https://jsperf.com/create-an-array-of-initial-size/2
			var A = []; A[n-1] = undefined;
			if ( arguments.length > 1 ) {
				for ( var i = 0; i < n; i++ ) {
					// var newArgs = Array.prototype.slice.call(arguments, 1, arguments.length);
					// We must use "Array.prototype.slice.call(arguments, 1, arguments.length)" instead of 
					// shortly "arguments.slice(1, arguments.length)" because the "arguments" object is 
					// NOT an Array. It is similar to an Array, but does not have any Array properties or
					// methods (like pop, push etc.). The only Array property "argument" has is "length".
					// That's why we can use "arguments.length" and cannot use Array functions like 
					// "arguments.slice(..)" immediately, but "Array.prototype.slice(arguments,..)" using
					// the general "Array.prototype.*".
					var newArgs = Array.prototype.slice.call(arguments, 1); // get all args from the second index.					
					A[i] = this.createArray(newArgs);
				};
			}
			return A;
		}, // createArray
		/*
		 * Creates a mxn matrix
		 */
		createMatrix : function (row, cols) {
			return createArray(rows, cols);
		}, // createMatrix
		/*
		 * Covnerts DEGree to RADian and vice versa
		 * @param:
		 *		angle:
		 *			Angle value to be converted between DEGree and RADian
		 *		mode:
		 *			true  : DEGree -> RADian
		 *			false : RADian -> DEGree
 		 */
		convertAngleMode : function (/* float */ angle, /* bool */ mode) {
			return ( mode ) ? angle * Math.PI / 180 : angle * 180 / Math.PI;
		},
	};
};

/**
 * Fuer Interface werdem keine Prototyp-Funktionen der Form "<class_name>.prototype.<function_name> = function () {..}"
 * wie { getters, setters } definiert. Alles innerhalb des var-Rumpfes bzw. der var-Klammern {..} (d.h. 
 * var <IName> = function () {..}) sind Properties (Eigenschaften).
 */

/*======================*
 *		Interface         *
 *======================*/
//===============================================================================================================
var IKraft = function (/* float */ betrag) {
	this.betrag = ( arguments.length != 0 ) ? betrag : 0;
	this.richtung = { vx : 0, vy : 0, vz : 0 }; // Richtungsvektor
	this.neigung = 90; // Neigungswinkel in Grad (°), senkrecht zur horizontalen Ebene
	// Some properties as functions
	this.getBetrag = function () { return this.betrag; }; // usage: this.getBetrag()
	this.setRichtung = function (vx, vy, vz) {
		this.richtung.vx = vx; this.richtung.vy = vy; this.richtung.vz = vz;
	}
};

//===============================================================================================================
var IMoment = function (/* float */ betrag, /* unsigned short int */ drehsinn) {
	this.betrag = ( betrag != undefined ) ? betrag : 0;
	this.drehsinn = ( drehsinn != undefined ) ? drehsinn : 1; // +1 : nach links, -1 nach rechts (drehend)
};


/*======================*
 *			Class          *
 *======================*/
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
var Kraft = function (/* float */ betrag) { // Externe/Einwirkende Kraft
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
	this.kraft.setRichtung(0,1,0);
};
Loslager.prototype = Object.create(Lager.prototype);
Loslager.prototype.constructor = Loslager;

//===============================================================================================================
var Festlager = function Loslager (/* string */ bezeichnung) {
	Lager.call(this, 2, bezeichnung);
	this.typ = "Festlager";
	this.kraft = new IKraft(0); // Horizontal
	this.kraft2 = new IKraft(0); // Vertikal
	
	this.kraft.setRichtung(1,0,0);
	this.kraft2.setRichtung(0,1,0);
};
Festlager.prototype = Object.create(Lager.prototype);
Festlager.prototype.constructor = Festlager;

//===============================================================================================================
var Einspannung = function Einspannung (/* string */ bezeichnung) {
	Lager.call(this, 3, bezeichnung);
	this.typ = "Einspannung";
	this.kraft = new IKraft(0); // Horizontal
	this.kraft2 = new IKraft(0); // Vertikal
	
	this.kraft.setRichtung(1,0,0);
	this.kraft2.setRichtung(0,1,0);
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
	this.r = 0; // Anzahl der Unbekannten bzw. Lagerreaktionen
	this.g = 0; // Anzahl der Bindungselemente
	this.v = 0; // Anzahl der Bindungen, d.h. v = k*g, wobei k die Anzahl der Bindungsmöglichkeiten von jedem g ist.
	this.n = 0; // Anzahl der (Teil-)Koerpern im System
	this.getAnzahlLagerrekationen = function () {
		if ( this.r != 0 ) return this.r;
		this.Components.forEach(function (c) {
			if ( c.typ == "Loslager" || c.typ == "Festlager" || c.typ == "Einspannung" ) {
				this.r += c.wertigkeit;
			}
		});
		return this.r;
	};
	this.checkStatischBestimmtheit = function () { // 3*n = r + v = r + k * g
	};
	this.validate = function () {
		if ( this.Components.length != 0 ) {
			// Matrix der Gleichgewichtsbedingungen
			var MM = m_Baukasten().createMatrix(this.r, this.r);
			// Fallunterscheidungen
			Fall_1(this.Components, this.r, MM);
		}
	};
};

/*
 * Fall_2 : Balken, Loslager/Festlager, externe Kräfte, Last
 */
 
/*
 * Fall_1 : Balken, Loslager/Festlager, externe Kräfte 
 */
var Fall_1 = function (Components, /* #Lagerreaktionen*/ r, /* Matrix */ MM) {
	var mm_row = 0, mm_col = 0, vIndex = 0;
	// Vektor für externe Kräfte
	var Vk = new Array(r);
	for ( var i = 0; i < r; i++ ) Vk[i] = 0;
	// Gleichgewichtsbedingung: Horizontal
	Components.forEach(function (c) {
		switch (c.typ) {
			case "Loslager":
				MM[mm_row][mm_col] = 0;
				break;
			case "Festlager":
				MM[mm_row][mm_col] = c.kraft.richtung.vx;
				break;
			case "Einspannung":
				MM[mm_row][mm_col] = c.kraft.richtung.vx;
				break;
			case "Kraft":
				Vk[vIndex] += c.kraft.richtung.vx * c.kraft.betrag;
				break;
			default:
				break;
		}
		mm_col += 1;
	});
	mm_row += 1;
	// Gleichgewichtsbedingung: Vertikal
	Components.forEach(function (c) {
		switch (c.typ) {
			case "Loslager":
				MM[mm_row][mm_col] = c.kraft.richtung.vy;
				break;
			case "Festlager":
				MM[mm_row][mm_col] = c.kraft.richtung.vx;
				break;
			case "Einspannung":
				MM[mm_row][mm_col] = c.kraft.richtung.vx;
				break;
			case "Kraft":
				Vk[vIndex] += c.kraft.richtung.vx * c.kraft.betrag;
				break;
			default:
				break;
		}
		mm_col += 1;
	});
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
console.log("Create an 2-dim array");
var arr = m_Baukasten().createArray(2,3);
console.log("var arr = m_Baukasten().createArray(2,3);");
console.log("arr.length : " + arr.length);
console.log("arr[0].length : " + arr[0].length);
console.log("arr[0][0] = " + (arr[0][0] == undefined));