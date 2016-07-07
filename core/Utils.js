var Utils = (function() {
	
	// A cross-browser requestAnimationFrame
	function getRequestAnimationFrame() {
	    return window.requestAnimationFrame    ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame    ||
	        window.oRequestAnimationFrame      ||
	        window.msRequestAnimationFrame     ||
	        function(callback){
	            window.setTimeout(callback, 1000 / 60);
	        };
	}

	return {
		getRequestAnimationFrame: getRequestAnimationFrame
	}

})();