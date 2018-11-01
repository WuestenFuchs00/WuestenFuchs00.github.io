/**
 * script.js
 */ 
var mJS = (function () {
	return {
		/*
		* Provides the current window size. If the window is resized by the user,
		* this function also returns the updated window size.
		*/
		mGetWindowSize : function () {
			var w = window, b = document.body, e = document.documentElement
				width = w.innerWidth || b.clientWidth || e.clientWidth,
				height = w.innerHeight || b.clientHeight || e.clientHeight;
			return {width, height};
		}, // mGetWindowSize
		/*
		* Adjust the (recently loaded) image to fit to the new window size.
		*/
		mResizeImg : function (o) {
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
			o.setAttribute("style", "width:" + newImgWidth + "px");
			o.setAttribute("style", "height:" + newImgHeight + "px");
		}, // mResizeImg
		/*
		 *
		 */
		mScaleBoxes : function () {
			// Get number of topic boxes
			var mBoxes = document.querySelectorAll("div.mTopic");
			if ( mBoxes.length <= 0 ) return; // Exit
			// Get total width of all boxes
			var mOffset = 10; // const margin top/bottom left/right
			var mTotalW = mBoxes.length * ( mOffset + mBoxes[0].getBoundingClientRect().width );
			// Get (current) window width
			var mWindowWidth = this.mGetWindowSize().width;
			// Calculate section height
			var mSectionHeight = 0;			
			var mL = 1;
			if ( mTotalW < mWindowWidth ) {
				mSectionHeight = mBoxes[0].getBoundingClientRect().height + 3 * mOffset;
			} else {
				mL = Math.ceil(mTotalW / mWindowWidth);
				mSectionHeight = (mBoxes[0].getBoundingClientRect().height * mL) + 3.6 * mOffset;
			}
			// Set section height
			var mSection = document.querySelectorAll("div.mSection")[0];
			mSection.setAttribute("style", "height:" + mSectionHeight + "px");
		}, // mScaleBoxes
	}
})();

// document.addEventListener("DOMContentLoaded", () => mJS.mScaleBoxes(), false);
document.addEventListener("DOMContentLoaded", function () { mJS.mScaleBoxes(); }, false);