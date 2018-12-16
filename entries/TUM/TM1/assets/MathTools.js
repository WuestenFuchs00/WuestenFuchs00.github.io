/**
 * MathTools.js
 * Copyright 2018
 */

// Initialize MathTools
var Mathx = new MathTools();

function MathTools () {
	this.Algebra = {
		/*
		 * Geradengleichung. Normalform: y = m * x + n
		 * @params:
		 *		m : Anstieg (Steigung) der Geraden
		 *		n : Schnittpunkt mit der y-Achse
		 */
		Line : function (m,n) {
			this.m = m;
			this.n = n;
		}, // Line
		/*
		 * Converts angle from DEGree mode to RADian mode
		 */
		deg_to_rad : function (/* float */ angle) {
			return angle * Math.PI / 180;
		}, // deg_to_rad
		/*
		 * Converts angle from RADian mode to DEGree mode
		 */
		rad_to_degree : function (/* float */ angle) {
			return angle * 180 / Math.PI;
		}, // rad_to_deg
		/*
		 * Build the line equation {y = mx + n} by means of two points p1 and p2.
		 * @params:
		 * 		p1 : Point with properties { p1.x, p1.y }
		 * 		p2 : Point with properties { p2.x, p2.y }
		 * @return:
		 *		An Line object of the form Line(m,n)
		 *
		 * Reference: Zweipunkteform: https://de.wikipedia.org/wiki/Geradengleichung
		 */
		build_line_equation : function (p1, p2) {
			var m = (p2.y - p1.y) / (p2.x - p1.x),
				n = (p1.y * p2.x - p2.y * p1.x) / (p2.x - p1.x);
			return new this.Line(m,n);
		},
	}; // Algebra
	this.Vector = {
		/*
		 * Cross product (Kreuzprodukt)
		 * @params:
		 *		a : 3-dimensional array (vector) of float values
		 *		b : 3-dimensional array (vector) of float values
		 * @return:
		 *		c : 3-dimensional array (vector) of float values.
		 *			Cross-product of {a x b}
		 */
		cross_product : function (a, b) { // a x b
			if ( a == undefined || b == undefined || a.length != 3 || b.length != 3 ) {
				console.log("Invalid Argument Exception: Arguments must be 3-dimensional arrays of float values.");
				return null;
			}
			return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
		}, // Cross product, Kreuzprodukt
		/*
		* Calculates the absolute value (length) of {a} vector. 
		* (Betrag bzw. Laenge eines Vektors).
		*
		* @params:
		*		a : An n-dimensional array (vector) of float values
		* @return:
		*		Length of vector {a}
		*/
		length : function (vx, vy, vz) {
			if ( arguments.length == 0 ) return -1;
			var sum = 0;					
			for ( var i = 0; i < arguments.length; i++ ) sum += arguments[i] * arguments[i];
			return Math.sqrt(sum);
		} // length
	} // Vektor
};
