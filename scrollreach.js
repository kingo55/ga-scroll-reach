// Scroll reach tracking (WTFPL licensed) by Robert Kingston - http://www.optimisationbeacon.com/
// Cookie functions from Quirks Mode by Scott Andrew - http://www.scottandrew.com/

function mkScrCookie(e, t, n) {
    if (n) {
        var r = new Date;
        r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
        var i = "; expires=" + r.toGMTString()
    } else var i = "";
    document.cookie = e + "=" + t + i + "; path=/"
}

function rdScrCookie(e) {
    var t = e + "=";
    var n = document.cookie.split(";");
    for (var r = 0; r < n.length; r++) {
        var i = n[r];
        while (i.charAt(0) == " ") i = i.substring(1, i.length);
        if (i.indexOf(t) == 0) return i.substring(t.length, i.length)
    }
    return null
}

function rmScrCookie(e) {
    mkScrCookie(e, "", -1)
}

// Start the tracking at document ready, for browsers that may start at the bottom
jQuery(document).ready(function () {

  // Catching any errors that result from reading the cookie (troublesome in IE)
    try {
        var _scrCookie = parseInt(rdScrCookie("scrReach"));
		
		// Test if cookie exists from previous page on domain before tracking scroll reach
        if (_scrCookie != undefined && document.referrer.indexOf("//"+document.location.hostname) > -1) {
            _gaq.push(["_trackEvent", "scroll reach", "viewport height: " + jQuery(window).height(), document.referrer.toString(), _scrCookie]);
			
			// Remove cookie for 
            rmScrCookie("scrReach")
        }
    } catch (err) {}
	
	// Set the height of the document, window and initial scroll reach, then create a cookie.
    var _docHeight = jQuery(document).height();
    var _winHeight = jQuery(window).height();
    var _scrTop = jQuery(window).scrollTop();
    var _scrReach = Math.round(_winHeight / _docHeight * 100);
    mkScrCookie("scrReach", _scrReach);
	
	// Whenever the user scrolls, the measurements are calculated again and if scroll reach is higher, the value is written to a cookie.
    jQuery(document).scroll(function () {
		_docHeight = jQuery(document).height();
		_winHeight = jQuery(window).height();
        _scrTop = jQuery(window).scrollTop();
        var e = _scrTop + _winHeight;
        var t = Math.round(e / _docHeight * 100);
        if (t > _scrReach) {
            _scrReach = t;
            mkScrCookie("scrReach", t)
        }
    });
});
