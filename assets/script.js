/**
 * script.js
 */ 
var mJS = (function () {
	var g = {
		captions : ["Technische Mechanik", "Chemie", "Physik", "Technische Elektrizitätslehre", "CAD", "", "", ""],
		styleBoxes : [
			"background: linear-gradient(45deg, #2e86c1, #3498db, #5dade2, #85c1e9 86%);", /* MouseOver */ 
			"background: linear-gradient(45deg, #28b463, #2ecc71, #58d68d, #82e0aa 69%);", 
			"background: linear-gradient(45deg, #f1c40f, #f4d03f, #f7dc6f, #f9e79f 60%);", 
			"background: linear-gradient(45deg, #d68910, #f39c12, #f5b041, #f8c471 86%);", 
			"background: linear-gradient(45deg, #2e4053, #34495e, #5d6d7e, #85929e 86%);", 
			"background: linear-gradient(45deg, #884ea0, #9b59b6, #af7ac5, #c39bd3 86%);", 
			"background: linear-gradient(45deg, #cb4335, #e74c3c, #ec7063, #f5b7b1 99%);", 
			"background: linear-gradient(45deg, #ba4a00, #d35400, #dc7633, #e59866 86%);", 
			"background: linear-gradient(135deg, #2e86c1, #3498db, #5dade2, #85c1e9 86%);", /* MouseOut */
			"background: linear-gradient(135deg, #28b463, #2ecc71, #58d68d, #82e0aa 69%);", 
			"background: linear-gradient(135deg, #f1c40f, #f4d03f, #f7dc6f, #f9e79f 60%);", 
			"background: linear-gradient(135deg, #d68910, #f39c12, #f5b041, #f8c471 86%);", 
			"background: linear-gradient(135deg, #2e4053, #34495e, #5d6d7e, #85929e 86%);",
			"background: linear-gradient(135deg, #884ea0, #9b59b6, #af7ac5, #c39bd3 86%);",
			"background: linear-gradient(135deg, #cb4335, #e74c3c, #ec7063, #f5b7b1 99%);", 
			"background: linear-gradient(135deg, #ba4a00, #d35400, #dc7633, #e59866 86%);"
		],
		urls : [
			"entries/TUM/TM1/index.html", 
			"entries/TUM/Chemie/index.html", "#", "#", "#", "#", "#", "#",
		],
		pianoNotes : [
			"media/piano_note_pack/mp3/Do.mp3",
			"media/piano_note_pack/mp3/Re.mp3",
			"media/piano_note_pack/mp3/Mi.mp3",
			"media/piano_note_pack/mp3/Fa.mp3",
			"media/piano_note_pack/mp3/Sol.mp3",
			"media/piano_note_pack/mp3/La.mp3",
			"media/piano_note_pack/mp3/Si.mp3",
			"media/piano_note_pack/mp3/Do_Octave.mp3",
		],
		piano : null,
		boxes : [],
		sectionOutput : null,
		volumeOn : true,
	};
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
			// Get total width of all boxes
			var mOffset = 10; // const margin top/bottom left/right
			var mTotalW = g.boxes.length * ( mOffset + g.boxes[0].getBoundingClientRect().width );
			// Get (current) window width
			var mWindowWidth = this.mGetWindowSize().width;
			// Calculate section height
			var mSectionHeight = 0;			
			var mL = 1;
			if ( mTotalW < mWindowWidth ) {
				mSectionHeight = g.boxes[0].getBoundingClientRect().height + 3 * mOffset;
			} else {
				mL = Math.ceil(mTotalW / mWindowWidth);
				mSectionHeight = (g.boxes[0].getBoundingClientRect().height * mL) + 3.6 * mOffset;
			}
			// Set section height
			var mSection = document.querySelectorAll("div.mSection")[0];
			mSection.setAttribute("style", "height:" + mSectionHeight + "px");
		}, // mScaleBoxes
		mAddListenersBoxes : function () {
			for ( var i = 0; i < g.boxes.length; i++ ) {
				// Add MouseOver listeners
				g.boxes[i].addEventListener("mouseover", function (evt) {
					var mStyle = "cursor: pointer;";
					for ( var k = 0; k < g.boxes.length; k++ ) {
						if ( evt.target == g.boxes[k] ) {
							evt.target.setAttribute("style", mStyle + g.styleBoxes[k]);
							break;
						}
					}
				}, false);
				// Add MouseOut listeners
				g.boxes[i].addEventListener("mouseout", function (evt) {
					var mStyle = "cursor: auto;";
					for ( var k = 0; k < g.boxes.length; k++ ) {
						if ( evt.target == g.boxes[k] ) {
							evt.target.setAttribute("style", mStyle + g.styleBoxes[k+8]);
							break;
						}
					}
				}, false);
				// Add Click listeners
				g.boxes[i].addEventListener("click", function (evt) {
					for ( var k = 0; k < g.boxes.length; k++ ) {
						if ( evt.target == g.boxes[k] ) {
							// Play a piano note
							g.piano = new Audio(g.pianoNotes[k]);
							if ( g.volumeOn ) g.piano.play();
							// Insert information and animation
							g.sectionOutput.innerHTML = g.captions[k];
							var mALink = document.createElement("A");
							mALink.setAttribute("href", g.urls[k]);
							mALink.setAttribute("style", "margin-left: 8px; padding: 10px; text-decoration: none; background-color: red; color: #fff;");
							mALink.innerHTML = "Continue";
							g.sectionOutput.appendChild(mALink);
							break;
						}
					}
				}, false);
			}
		}, // mAddListenersBoxes
		/*
		 *
		 */
		mInit : function () {
			g.boxes = ( document.querySelectorAll("div.mTopic") ) ? document.querySelectorAll("div.mTopic") : [];
			g.sectionOutput = ( document.querySelectorAll("div.mSection") ) ? document.querySelectorAll("div.mSection")[1] : null;
			if ( g.boxes.length <= 0 || !g.sectionOutput ) return; // Exit
			g.sectionOutput.setAttribute("style", "padding: 6px 6px; font-size: 18px; font-family: 'Abel';");
			this.mScaleBoxes();
			this.mAddListenersBoxes();
		}, // mInit
	}
})();

// document.addEventListener("DOMContentLoaded", () => mJS.mScaleBoxes(), false);
document.addEventListener("DOMContentLoaded", function () { mJS.mInit(); }, false);