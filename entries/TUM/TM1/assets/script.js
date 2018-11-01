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
			x = w.innerWidth || b.clientWidth || e.clientWidth,
			y = w.innerHeight || b.clientHeight || e.clientHeight;
		return {x,y}; // {width,height}
	}
	
	/*
	 * Adjust the (recently loaded) image to fit to the new window size.
	 */
	function mResizeImg(o) {
		// Get image size
		var imgWidth = o.getBoundingClientRect().width,
			imgHeight = o.getBoundingClientRect().height;
		// Calculate (new) image size, related to current window size
		var newImgWidth = mGetWindowSize().x,
			newImgHeight = (imgHeight / imgWidth) * newImgWidth;
		// Set image size
		o.setAttribute("style","width:" + newImgWidth + "px");
		o.setAttribute("style","height:" + newImgHeight + "px");
	}
-->