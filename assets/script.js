<!--
	function clearInput () {
		document.getElementById('mDivElektronenkonfigurationAusgabe').innerHTML = "NaN";
		document.getElementById('mInputElement').value = "";
	}
	
	function setOpacity (mObj, mOpac) { /* mOpac is a numbre between 0% and 100% */
		mObj.style.opacity = "" + (mOpac/100);
		mObj.style.filter = "alpha(opacity=" + mOpac + ")";
	}
	
	function printElektronenkonfiguration () {
		var strAusgabe = Elektronenkonfiguration(document.getElementById('mInputElement').value);		
		var divAusgabe = document.getElementById('mDivElektronenkonfigurationAusgabe');
		var mOpac = 0, mId = 0;
		
		setOpacity(divAusgabe, mOpac);
		divAusgabe.innerHTML = strAusgabe.replace(/\(/g, "<sup>").replace(/\)/g, "</sup>&nbsp;");
		
		mId = window.setInterval(function () {
			if ( mOpac >= 100 ) {
				setOpacity(divAusgabe, 100);
				clearTimeout(mId);
				return;
			}
			mOpac += 5;
			setOpacity(divAusgabe, mOpac);
		}, 50);
	}
-->