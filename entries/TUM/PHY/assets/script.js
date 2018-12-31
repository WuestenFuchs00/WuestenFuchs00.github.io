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
				* Trickserklaerung: 
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