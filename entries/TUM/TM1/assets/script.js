/**
 * script.js
 */

	function mTools () {
		return {
			uebung1_2 : function () {
				var mU12_frm = document.frm_TM1_Uebung1_2,
					mU12_G = mU12_frm.frm_TM1_Uebung1_2_G,
					mU12_F = mU12_frm.frm_TM1_Uebung1_2_F,
					mU12_a = mU12_frm.frm_TM1_Uebung1_2_a,
					mU12_b = mU12_frm.frm_TM1_Uebung1_2_b,
					mU12_c = mU12_frm.frm_TM1_Uebung1_2_c, // gamma
					mU12_Fl = mU12_frm.frm_TM1_Uebung1_2_Fl,
					mU12_Fr = mU12_frm.frm_TM1_Uebung1_2_Fr;
				return {
						clear : function () {
							mU12_G.value = "";
							mU12_F.value = "";
							mU12_a.value = "";
							mU12_b.value = "";
							mU12_c.value = "";
						}, // clear
						reset : function () {
							mU12_G.value = "500";
							mU12_F.value = "200";
							mU12_a.value = "30";
							mU12_b.value = "45";
							mU12_c.value = "60";
						}, // reset
						round : function (zahl, nachkommastellen) {
							var umrechnungsfaktor = Math.pow(10, nachkommastellen);
							return Math.round(zahl * umrechnungsfaktor) / umrechnungsfaktor;
							/*
							 * Trickerklärung: 
							 * 1.466 soll auf e=2 Nachkommastellen gerundet werden.
							 * Zuerst, 1.466 um e=2 Stellen nach rechts verschieben:
							 * 		1.466 * 10^2 = 146.6
							 * Jetzt aufrunden mit Math.round():
							 *		Math.round(146.6) = 147
							 * weil Math,round() nur 1 Nachkommastelle runden kann.
							 * Jetzt 147 um 2 Stellen nach links verschieben:
							 *		147 / 10^2 = 1.47
							 * Damit wurde 1.466 richtig auf 2 Nachkommastellen gerundet.
							 * Alle Schritt zusammen:
							 *		var umrechnungsfaktor = Math.pow(10, e); // e = Nachkommastellen
							 *		var ergebnis = Math.round(zahl * umrechnungsfaktor) / umrechungsfaktor;
							 */
						}, // round
						deg2rad : function (degVal) {
							return degVal * Math.PI / 180;
						}, // rad2deg
						calc : function () {
							mU12_G = parseFloat(mU12_G.value);
							mU12_F = parseFloat(mU12_F.value);
							mU12_a = this.deg2rad(parseFloat(mU12_a.value));
							mU12_b = this.deg2rad(parseFloat(mU12_b.value));
							mU12_c = this.deg2rad(parseFloat(mU12_c.value));
							
							var Fl = mU12_F * ( Math.sin(mU12_a) - Math.cos(mU12_a) * Math.tan(mU12_c) ) + mU12_G;
							Fl /= Math.sin(mU12_b) + Math.cos(mU12_b) * Math.tan(mU12_c);							
							var Fr = mU12_F * (Math.cos(mU12_a)/Math.cos(mU12_c)) + Fl * (Math.cos(mU12_b)/Math.cos(mU12_c));
							
							mU12_Fl.value = "" + this.round(Fl,1);
							mU12_Fr.value = "" + this.round(Fr,1);
						}, // calc
				};
			},
		};
	}
	
	/*
	 * Provides the current window size. If the window is resized by the user,
	 * this function also returns the updated window/screen size.
	 */
	function mGetWindowSize() {
		var w = window, b = document.body, e = document.documentElement
			width = w.innerWidth || b.clientWidth || e.clientWidth,
			height = w.innerHeight || b.clientHeight || e.clientHeight;
		return {width, height};
	}
	
	/*
	 * Adjust the (recently loaded) image to fit to the new window/screen size.
	 */
	function mResizeImg(o) {
		// Get image size
		var imgWidth = o.getBoundingClientRect().width,
			imgHeight = o.getBoundingClientRect().height;
		// Calculate (new) image size, related to (current) window size
		var offset = 5*6; // from css style, margin left/right, factor 5x
		var windowSize = mGetWindowSize();
		var newImgWidth = ( imgWidth > windowSize.width ) ? windowSize.width : imgWidth;
		newImgWidth -= offset;
		var newImgHeight = ( imgWidth > windowSize.width ) ? (imgHeight / imgWidth) * newImgWidth : imgHeight;
		// Set image size
		o.setAttribute("style","width:" + newImgWidth + "px");
		o.setAttribute("style","height:" + newImgHeight + "px");
	}
	
	/*
	 * Searches in all nodes and their children for the max height value (scrollHeight, clientHeight).
	 */
	function mGetMaxHeight (rootNode, startHeight) {		
		var mHeight = 0;		
		for ( var i = rootNode.childNodes.length-1; i >= 0; i-- ) {
			var node = rootNode.childNodes[i];
			if ( node.scrollHeight && node.clientHeight ) {
				var nodeHeight = Math.max(node.scrollHeight, node.clientHeight);
				// Update mHeight
				mHeight = Math.max(nodeHeight, startHeight);
			}
			// recursive
			if ( node.childNodes.length ) mHeight = Math.max(mHeight, mGetMaxHeight(node, mHeight));
		}
		return mHeight;
	}
	
	/*
	 * Returns the max page height
	 */
	function mGetPageHeight () {
		var mRoot = document.documentElement || document.body;
		return mGetMaxHeight(mRoot, 0);
	}
	
	/*
	 * Resize screen 
	 */
	function mResizeScreen() {
		var windowSize = this.mGetWindowSize();
		var strStyle = "";
		if ( windowSize.width > 820 ) {
			strStyle = "box-shadow: 0 0 4px rgba(30,30,30,.6);";
			strStyle += "width:" + (windowSize.width / 2) + "px;";
		}
		strStyle += "height:" + mGetPageHeight()*2 + "px;";
		document.getElementById("mPage").setAttribute("style", strStyle);		
	}
	
document.addEventListener("DOMContentLoaded", function () { mResizeScreen(); }, false);