/**
 * script.js
 * Copyright 2018
 */

	var g = {
		pageID : 'mPage',
		menueDockID : 'mMenueDock',
		menueID : 'mMenue',
		IsMenueShowing : false,
		ImgScaleFactor : 1.6,
		pageWidth : 820, // px
		pageContentWidth : 0,
	};
	
	function mTools () {
		return {
			clear : function (o) {
				var mNode = o;
				while ( mNode.tagName != "FORM" ) { // mNode.nodeName != "FORM"
					mNode = mNode.parentNode;
				}
				var mTextfields = ( mNode.querySelectorAll('input[type="text"]') ) ? mNode.querySelectorAll('input[type="text"]') : [];
				if ( mTextfields.length == 0 ) return; // Exit
				for ( var i = 0; i < mTextfields.length; i++ ) {
					mTextfields[i].value = "";
				}
			}, // clear
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
			replaceCommaByDot : function (mVal) {
				var tmp = "" + mVal;
				var regex = /,/g; // The comma is given by ','
				if ( tmp.search(regex) != -1 ) { // returns the first occurence (index) of Comma in string strVal, otherwise returns -1
					tmp = tmp.replace(regex, "."); // comma is replaced by dot (.)
				}
				return tmp;
			}, // replaceCommaByDot
			replaceDotByComma : function (mVal) {
				return ("" + mVal).replace(".", ",");
			}, // replaceDotByComma
			formatResult : function ( /* double */ fVal ) { // return string
				var strRes = mTools().replaceDotByComma(fVal);
				if ( fVal > 0 ) strRes = "+" + strRes;
				// wenn Ergebnis keine Nachkommastellen hat, z.B. +126. Dann fuegt Nullkommastellen hinzu -> +126,0
				if ( strRes.search(/,/g) == -1 ) strRes += ",0";
				return strRes;
			}, // formatResult
			etest1 : function () {
				var mE1_frm = document.frm_TM1_ETest_1,
					mE1_F = mE1_frm.frm_TM1_ETest_1_F,
					mE1_a = mE1_frm.frm_TM1_ETest_1_a, // alpha
					mE1_r = mE1_frm.frm_TM1_ETest_1_r,
					mE1_Ax = mE1_frm.frm_TM1_ETest_1_Ax;
				return {
					reset : function () {
						mE1_F.value = "80";
						mE1_a.value = "21";
						mE1_r.value = "4";
					}, // reset
					calc : function () {
						mE1_F = parseFloat(mTools().replaceCommaByDot(mE1_F.value));
						mE1_a = mTools().deg2rad(parseFloat(mTools().replaceCommaByDot(mE1_a.value))); // deg -> rad
						
						var Ax = ( Math.sin(mE1_a) - Math.cos(mE1_a) - 1) * mE1_F;
						mE1_Ax.value = ("" + mTools().round(Ax,1)).replace(".", ","); // replace Dot by Comma
						
						if ( Ax > 0 ) mE1_Ax.value = "+" + mE1_Ax.value;
						if ( mE1_Ax.value.search(/,/g) == -1 ) { // wenn Ergebnis keine Nachkommastellen hat, z.B. +126. Dann fuegt Nullkommastellen hinzu -> +126,0
							mE1_Ax.value += ",0";
						}
					}, // calc
				}
			}, // etest1
			etest2 : function () {
				var mE2_frm = document.frm_TM1_ETest_2,
					mE2_F1 = mE2_frm.frm_TM1_ETest_2_F1,
					mE2_F2 = mE2_frm.frm_TM1_ETest_2_F2,
					mE2_a = mE2_frm.frm_TM1_ETest_2_a, // alpha
					mE2_b = mE2_frm.frm_TM1_ETest_2_b,
					mE2_AV = mE2_frm.frm_TM1_ETest_2_AV,
					mE2_AH = mE2_frm.frm_TM1_ETest_2_AH,
					mE2_BV = mE2_frm.frm_TM1_ETest_2_BV,
					mE2_S1 = mE2_frm.frm_TM1_ETest_2_S1;
				return {
					reset : function () {
						mE2_F1.value = "67,3";
						mE2_F2.value = "97,1";
						mE2_a.value = "38,5";
						mE2_b.value = "3,3";
						mE2_AV.value = "?";
						mE2_AH.value = "?";
						mE2_BV.value = "?";
						mE2_S1.value = "?";
					}, // reset
					calc : function () {
						mE2_F1 = parseFloat(mTools().replaceCommaByDot(mE2_F1.value));
						mE2_F2 = parseFloat(mTools().replaceCommaByDot(mE2_F2.value));
						mE2_a = mTools().deg2rad(parseFloat(mTools().replaceCommaByDot(mE2_a.value))); // deg -> rad
						mE2_b = parseFloat(mTools().replaceCommaByDot(mE2_b.value));
						
						var AV = 0.5 * mE2_F2 + (mE2_F1 * Math.tan(mE2_a) * 0.25);
						var AH = mE2_F1;
						var BV = 0.5 * mE2_F2 - (mE2_F1 * Math.tan(mE2_a) * 0.25);
						var S1 = -0.25 * mE2_F1 + (mE2_F2 / (Math.tan(mE2_a) * 2));
						AV = mTools().round(AV,1);
						BV = mTools().round(BV,1);
						S1 = mTools().round(S1,1);
						
						mE2_AV.value = ("" + AV).replace(".", ","); // replace Dot by Comma
						mE2_AH.value = ("" + mTools().round(mE2_F1, 1)).replace(".", ",");
						mE2_BV.value = ("" + BV).replace(".", ",");
						mE2_S1.value = ("" + S1).replace(".", ",");
						
						if ( AV > 0 ) mE2_AV.value = "+" + mE2_AV.value;
						if ( AH > 0 ) mE2_AH.value = "+" + mE2_AH.value;
						if ( BV > 0 ) mE2_BV.value = "+" + mE2_BV.value;
						if ( S1 > 0 ) mE2_S1.value = "+" + mE2_S1.value;
						
						if ( mE2_AV.value.search(/,/g) == -1 ) mE2_AV.value += ",0";
						if ( mE2_AH.value.search(/,/g) == -1 ) mE2_AH.value += ",0";
						if ( mE2_BV.value.search(/,/g) == -1 ) mE2_BV.value += ",0";
						if ( mE2_S1.value.search(/,/g) == -1 ) mE2_S1.value += ",0";
					}, // calc
				}
			}, // etest2
			etest3 : function () {
				var mE3_frm = document.frm_TM1_ETest_3,
					mE3_M = mE3_frm.frm_TM1_ETest_3_M,
					mE3_q0 = mE3_frm.frm_TM1_ETest_3_q0,
					mE3_l = mE3_frm.frm_TM1_ETest_3_l,
					mE3_n = mE3_frm.frm_TM1_ETest_3_n,
					mE3_x = mE3_frm.frm_TM1_ETest_3_x;
				return {
					reset : function () {
						mE3_q0.value = "141,5";
						mE3_l.value = "8,1";
						mE3_n.value = "5";
						mE3_x.value = "0,72";
					}, // reset
					calc : function () {
						mE3_q0 = parseFloat(mTools().replaceCommaByDot(mE3_q0.value));
						mE3_l = parseFloat(mTools().replaceCommaByDot(mE3_l.value));
						mE3_n = parseFloat(mTools().replaceCommaByDot(mE3_n.value));
						mE3_x = parseFloat(mTools().replaceCommaByDot(mE3_x.value));
						
						var M = (-1) * (mE3_q0 * mE3_l * mE3_l) / ((mE3_n + 1) * (mE3_n + 2));
						M *= Math.pow(mE3_x, mE3_n +2);
						M =  mTools().round(M,1); // Auf eine Nachkommastelle runden						
						mE3_M.value = mTools().formatResult(M);
					}, // calc
				}
			}, // etest3
			etest4 : function () {
				var mE4_frm = document.frm_TM1_ETest_4,
					mE4_M = mE4_frm.frm_TM1_ETest_4_M,
					mE4_F = mE4_frm.frm_TM1_ETest_4_F,
					mE4_l = mE4_frm.frm_TM1_ETest_4_l,
					mE4_x = mE4_frm.frm_TM1_ETest_4_x;
				return {
					reset : function () {
						mE4_F.value = "62,3";
						mE4_l.value = "3,2";
						mE4_x.value = "0,2";
					}, // reset
					calc : function () {
						mE4_F = parseFloat(mTools().replaceCommaByDot(mE4_F.value));
						mE4_l = parseFloat(mTools().replaceCommaByDot(mE4_l.value));
						mE4_x = parseFloat(mTools().replaceCommaByDot(mE4_x.value));
						
						var M = mE4_F * mE4_l * (2 - Math.sqrt(2) * mE4_x);
						M =  mTools().round(M,1); // Auf eine Nachkommastelle runden						
						mE4_M.value = mTools().formatResult(M);
					}, // calc
				}
			}, // etest4
			etest5 : function () {
				var mE5_frm = document.frm_TM1_ETest_5,
					mE5_q = mE5_frm.frm_TM1_ETest_5_q,
					mE5_F = mE5_frm.frm_TM1_ETest_5_F,
					mE5_M = mE5_frm.frm_TM1_ETest_5_M,
					mE5_x1 = mE5_frm.frm_TM1_ETest_5_x1,
					mE5_x2 = mE5_frm.frm_TM1_ETest_5_x2,
					mE5_y1 = mE5_frm.frm_TM1_ETest_5_y1,
					mE5_y2 = mE5_frm.frm_TM1_ETest_5_y2,
					mE5_AH = mE5_frm.frm_TM1_ETest_5_AH;
				return {
					reset : function () {
						mE5_q.value = "52,3"; mE5_F.value = "45,0"; mE5_M.value = "39,2"; mE5_AH.value = "?"
						mE5_x1.value = "4,1"; mE5_x2.value = "4,1"; mE5_y1.value = "3,2"; mE5_y2.value = "4,1";						
					}, // reset
					calc : function () {
						mE5_q = parseFloat(mTools().replaceCommaByDot(mE5_q.value));
						mE5_F = parseFloat(mTools().replaceCommaByDot(mE5_F.value));
						mE5_M = parseFloat(mTools().replaceCommaByDot(mE5_M.value));
						mE5_x2 = parseFloat(mTools().replaceCommaByDot(mE5_x2.value));
						mE5_y1 = parseFloat(mTools().replaceCommaByDot(mE5_y1.value));
						mE5_y2 = parseFloat(mTools().replaceCommaByDot(mE5_y2.value));
						
						var AH = (mE5_M - mE5_F * mE5_x2) / (mE5_x2 + mE5_y1);
						AH -= (mE5_q * mE5_y2) * 0.5;
						AH =  mTools().round(AH,1); // Auf eine Nachkommastelle runden						
						mE5_AH.value = mTools().formatResult(AH);
					}, // calc
				}
			}, // etest5
			/*
			 *
			 */
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
						reset : function () {
							mU12_G.value = "500";
							mU12_F.value = "200";
							mU12_a.value = "30";
							mU12_b.value = "45";
							mU12_c.value = "60";
						}, // reset
						calc : function () {
							mU12_G = parseFloat(mU12_G.value);
							mU12_F = parseFloat(mU12_F.value);
							mU12_a = mTools().deg2rad(parseFloat(mU12_a.value)); // deg -> rad
							mU12_b = mTools().deg2rad(parseFloat(mU12_b.value));
							mU12_c = mTools().deg2rad(parseFloat(mU12_c.value));
							
							var Fl = mU12_F * ( Math.sin(mU12_a) - Math.cos(mU12_a) * Math.tan(mU12_c) ) + mU12_G;
							Fl /= Math.sin(mU12_b) + Math.cos(mU12_b) * Math.tan(mU12_c);							
							var Fr = mU12_F * (Math.cos(mU12_a)/Math.cos(mU12_c)) + Fl * (Math.cos(mU12_b)/Math.cos(mU12_c));
							
							mU12_Fl.value = "" + mTools().round(Fl,1);
							mU12_Fr.value = "" + mTools().round(Fr,1);
						}, // calc
				};
			}, // uebung1_2
			/*
			 *
			 */
			uebung1_3 : function () {
				var mU13_frm = document.frm_TM1_Uebung1_3,
					mU13_R = mU13_frm.frm_TM1_Uebung1_3_R, // Rx = R
					mU13_a = mU13_frm.frm_TM1_Uebung1_3_a, // alpha
					mU13_b = mU13_frm.frm_TM1_Uebung1_3_b, // theta
					mU13_FA = mU13_frm.frm_TM1_Uebung1_3_FA,
					mU13_FB = mU13_frm.frm_TM1_Uebung1_3_FB;
				return {
						reset : function () {
							mU13_R.value = "950";
							mU13_a.value = "20"; // alpha
							mU13_b.value = "50"; // theta
						}, // reset
						calc : function () {
							mU13_R = parseFloat(mU13_R.value);
							mU13_a = mTools().deg2rad(parseFloat(mU13_a.value)); // deg -> rad
							mU13_b = mTools().deg2rad(parseFloat(mU13_b.value));
							
							var FB = mU13_R / ( (Math.cos(mU13_a)/Math.sin(mU13_a)) * Math.sin(mU13_b) + Math.cos(mU13_b) );
							var FA = (mU13_R * Math.sin(mU13_b)) / ( Math.cos(mU13_a) * Math.sin(mU13_b) + Math.cos(mU13_b) * Math.sin(mU13_a) );
							
							mU13_FB.value = "" + mTools().round(FB,1);
							mU13_FA.value = "" + mTools().round(FA,1);
						}, // calc
				};
			}, // uebung1_3
		};
	} // mTools
	
	/*
	 * Returns the x- and y-coordinate of a pixel/point on screen/window by mouse click.
	 */
	function mGetMousePosition (evt) {
		/* https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollX
		 * scrollX gibt den Wert des (verschieblichen) Scrollbars. Wenn der Screen/Window-Bereich nach links/rechts gescrollt wird,
		 * aendert sich der scrollX-Wert. Wenn es kein Scrollbar gibt, ist scrollX immer 0. Analog fuer scrollY.
		 *
		 * pageXOffset ist Alias von scrollX -->  ( pageXOffset == scrollX)
		 * 
		 * Wenn (window.pageXOffset) bzw. (window.scrollX) nicht existiert, dann verwendet (document.documentElement.scrollLeft).
		 *
		 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX
		 * clientX gibt die X-Koordinate des Mouse im SICHTBAREN ScreenWindow-Bereich an. Klickt man z.B. auf eine Stelle x und 
		 * die Koordinate clientX=12 erhaelt. Dann scrollt man nach rechts um scrollX=100px. Anschliessend klickt man im
		 * SICHTBAREN Screen/Window-Bereich wieder auf dieselbe Stelle x, erhaelt man ueberraschenderweise dieselbe Koordinate
		 * clientX=12, und NICHT clientX=(12 + scrollX). Analog fuer clientY.
		 *
		 * Um die tatsaechliche X-Koordinate zu ermitteln, werden scrollX und clientX miteinander addiert:
		 *		var x = scrollX + clientX;
		 * Fuer Cross-Browserkompatibilitaet ersetzt scrollX durch pageXOffset:
		 *		var x = pageXOffset + clientX;
		 * Ausfuehrlicher sieht es wie folgt:
		 *		var x = window.pageXOffset + event.clientX;
		 * bzw.
		 *		var x = ( window.pageXOffset || document.documentElement.scrollLeft ) + event.clientX;
		 */
		var x = window.pageXOffset || ( document.documentElement || document.body.parentNode || document.body ).scrollLeft;
		x += evt.clientX;
		
		var y = window.pageYOffset || ( document.documentElement || document.body.parentNode || document.body ).scrollTop;
		y+= evt.clientY;
		
		console.log("x: " + x + ", y: " + y + ", pageXOffset: " + window.pageXOffset + ", pageYOffset: " + window.pageYOffset + ", event.clientX: " + evt.clientX + ", event.clientY: " + evt.clientY + ", document.documentElement.scrollLeft: " + document.documentElement.scrollLeft);		
		return {x,y};
	}
	
	/*
	 * Refreshes / Reloades the page (window.location)
	 */
	function mRefreshPage () {
		if ( !location.hash || !window.location.hash ) {
			// If the URL is "www.website.com#part1", then "location.hash" returns
			// the anchor part beginning with # (hash), i.e. "#part1", including the
			// hash sign (#). If the URL is "www.website.com" without the anchor hash
			// part, then "location.hash" returns null.
			if ( location ) { 
				location += "#loaded";
				location.reload();
			}
			else { 
				window.location += "#loaded";
				window.location.reload(false);
			}
		}
	} // mRefreshPage
	
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
		var offset = 5 * 6; // from css style mSection, padding left/right, factor 5x
		var windowSize = mGetWindowSize();
		var newImgWidth = 0;
		/*if ( windowSize.width >= g.pageWidth ) {
			newImgWidth = ( imgWidth >= g.pageWidth ) ? g.pageWidth : imgWidth;
		} else {
			newImgWidth = ( imgWidth >= windowSize.width ) ? windowSize.width : imgWidth;
		}*/
		newImgWidth = ( imgWidth >= g.pageContentWidth ) ? g.pageContentWidth : imgWidth;
		newImgWidth -= offset;
		var newImgHeight = ( imgWidth > windowSize.width ) ? (imgHeight / imgWidth) * newImgWidth : imgHeight;
		// Set image size. Call the same commands 2x to make sure that changes are really done.
		o.setAttribute("style","height:" + newImgHeight + "px;");
		o.setAttribute("style","width:" + newImgWidth + "px;");
		o.setAttribute("style","height:" + newImgHeight + "px;");
		o.setAttribute("style","width:" + newImgWidth + "px;");
	}
	
	/*
	 * Searches in all nodes and their children for the max height value (scrollHeight, clientHeight).
	 */
	function mGetMaxHeight (rootNode, startHeight) {		
		var mHeight = 0;		
		for ( var i = rootNode.childNodes.length-1; i >= 0; i-- ) {
			var node = rootNode.childNodes[i];
			if ( node.scrollHeight && node.clientHeight ) {
				var nodeHeight = node.scrollHeight + node.clientHeight; //Math.max(node.scrollHeight, node.clientHeight);
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
	 * Display menue
	 */
	function mShowMenue () {		
		var menueDock = document.getElementById(g.menueDockID);
		if ( !menueDock ) return; // Exit
		var menue = document.getElementById(g.menueID);
		menue.setAttribute("style", "visibility: hidden; display: none;");
		
		// Registers listeners
		menueDock.addEventListener("click", () => {
			if ( !g.IsMenueShowing ) {
				menue.setAttribute("style", "visibility: visible; display: block;");
				menueDock.setAttribute("style", "background-color: rgba(93,109,126,.8);");
			}
			else {
				menue.setAttribute("style", "visibility: hidden; display: none;");
				menueDock.setAttribute("style", "background-color: none;");
			}
			g.IsMenueShowing = !g.IsMenueShowing;
		}, false);		
	}
	
	/*
	 * Resize screen 
	 */
	function mResizeScreen() {
		var windowSize = this.mGetWindowSize();
		var strStyle = "";
		g.pageContentWidth = ( windowSize.width > g.pageWidth ) ? windowSize.width / g.ImgScaleFactor : windowSize.width;
		if ( windowSize.width > g.pageWidth ) {
			strStyle = "box-shadow: 0 0 4px rgba(30,30,30,.6);";			
			strStyle += "width:" + g.pageContentWidth + "px;";			
		}
		strStyle += "height:" + mGetPageHeight()*1.3 + "px;";
		document.getElementById(g.pageID).setAttribute("style", strStyle);

		mShowMenue();
	}
	
document.addEventListener("DOMContentLoaded", function () { mResizeScreen(); }, false);