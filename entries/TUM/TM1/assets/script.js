/**
 * script.js
 */

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
	 *
	 */
	function mGetMaxHeight (rootNode, startHeight) {		
		var mHeight = 0;		
		for ( var i = rootNode.childNodes.length-1; i >= 0; i-- ) {
			var node = rootNode.childNodes[i];
			if ( node.scrollHeight && node.clientHeight ) {
				var nodeHeight = Math.max(node.scrollHeight, node.clientHeight);
				mHeight = Math.max(nodeHeight, startHeight);
			}
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