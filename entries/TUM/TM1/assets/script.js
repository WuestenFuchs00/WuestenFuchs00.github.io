/**
 * script.js
 */
<!--
	/*
	 * Provides the current window size. If the window is resized by the user,
	 * this function also returns the updated window size.
	 */
	function mGetWindowSize() {
		var w = window, b = document.body, e = document.documentElement
			width = w.innerWidth || b.clientWidth || e.clientWidth,
			height = w.innerHeight || b.clientHeight || e.clientHeight;
		return {width, height};
	}
	
	/*
	 * Adjust the (recently loaded) image to fit to the new window size.
	 */
	function mResizeImg(o) {
		// Get image size
		var imgWidth = o.getBoundingClientRect().width,
			imgHeight = o.getBoundingClientRect().height;
		// Calculate (new) image size, related to (current) window size
		var offset = 6*6; // from css style, margin left/right, factor 5x
		var windowSize = mGetWindowSize();
		var newImgWidth = ( imgWidth > windowSize.width ) ? windowSize.width : imgWidth;
		newImgWidth -= offset;
		var newImgHeight = ( imgWidth > windowSize.width ) ? (imgHeight / imgWidth) * newImgWidth : imgHeight;
		// Set image size
		o.setAttribute("style","width:" + newImgWidth + "px");
		o.setAttribute("style","height:" + newImgHeight + "px");
	}
-->