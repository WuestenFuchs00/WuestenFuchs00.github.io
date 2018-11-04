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
		boxes : [], /* mTopic boxes */
		sections : null, /* mSection blocks */
		speaker : [null,null,null], /* [slider, speakerIcon, speakerStatus] */
		speakerOn : false,
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
							if ( g.speakerOn ) g.piano.play();
							// Display (sub)section content
							if ( k >= g.sections.length ) continue;
							g.sections[k].setAttribute("class", "mSection");
							g.sections[k].setAttribute("style", "background-color: rgba(236,231,229,.9);");							
						}
						else {
							// Hide (sub)section content
							if ( k >= g.sections.length ) continue;
							g.sections[k].setAttribute("class", "mSection mHide");
						}
					}
				}, false);
			}
		}, // mAddListenersBoxes
		/*
		* Searches in all nodes and their children for the max height value (scrollHeight, clientHeight).
		*/
		mGetMaxHeight : function (rootNode, startHeight) {		
			var mHeight = 0;		
			for ( var i = rootNode.childNodes.length-1; i >= 0; i-- ) {
				var node = rootNode.childNodes[i];
				if ( node.scrollHeight && node.clientHeight ) {
					var nodeHeight = Math.max(node.scrollHeight, node.clientHeight);
					// Update mHeight
					mHeight = Math.max(nodeHeight, startHeight);
				}
				// Recursion
				if ( node.childNodes.length ) mHeight = Math.max(mHeight, this.mGetMaxHeight(node, mHeight));
			}
			return mHeight;
		}, // mGetMaxHeight
		/*
		* Returns the max page height
		*/
		mGetPageHeight : function () {
			var mRoot = document.documentElement || document.body;
			return this.mGetMaxHeight(mRoot, 0);
		}, // mGetPageHeight
		/*
		* Resize screen 
		*/
		mResizeScreen : function () {
			var windowSize = this.mGetWindowSize();
			var strStyle = "";
			if ( windowSize.width > 820 ) {
				strStyle = "box-shadow: 0 0 4px rgba(30,30,30,.6); width:" + (windowSize.width / 2) + "px;";
			}
			strStyle += "height:" + this.mGetPageHeight()*2 + "px;";
			document.getElementById("mPage").setAttribute("style", strStyle);		
		}, // mResizeScreen
		/*
		 *
		 */
		mInit : function () {			
			g.boxes = ( document.querySelectorAll("div.mTopic") ) ? document.querySelectorAll("div.mTopic") : [];
			g.sections = ( document.querySelectorAll("div.mSection.mHide") ) ? document.querySelectorAll("div.mSection.mHide") : null;
			if ( g.boxes.length <= 0 || !g.sections ) return; // Exit
			
			// Create speaker control
			g.speaker[0] = ( document.getElementById("mSpeakerSlider") ) ? document.getElementById("mSpeakerSlider") : null;
			g.speaker[1] = ( document.getElementById("mSpeakerIcon") ) ? document.getElementById("mSpeakerIcon") : null;
			g.speaker[2] = ( document.getElementById("mSpeakerStatus") ) ? document.getElementById("mSpeakerStatus") : null;			
			if ( g.speaker[0] == null ) return; // Exit
			
			// Configure speaker control
			g.speaker[0].addEventListener("click", function (evt) {
				g.speakerOn = evt.target.checked;
				if ( g.speakerOn ) {
					g.speaker[1].src = "media/speaker/volume-max-speaker_48.png";
					g.speaker[2].setAttribute("style", "color: rgba( 247,43,32,.8);");
					g.speaker[2].innerHTML = "Active";
				} else {
					g.speaker[1].src = "media/speaker/volume-mute-silence_48.png";
					g.speaker[2].setAttribute("style", "color: #000;");
					g.speaker[2].innerHTML = "Mute";					 
				}				
			}, false);	
			
			this.mScaleBoxes();
			this.mAddListenersBoxes();
			this.mResizeScreen();
		}, // mInit
	}
})();

// document.addEventListener("DOMContentLoaded", () => mJS.mScaleBoxes(), false);
document.addEventListener("DOMContentLoaded", function () { mJS.mInit(); }, false);

/*
 * Forward to new page with <strURL>
 */
function mForward (strURL) {
	window.location.href = strURL;
}