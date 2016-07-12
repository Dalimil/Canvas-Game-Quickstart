var Utils = {
	
	// A cross-browser requestAnimationFrame
	getRequestAnimationFrame: function() {
	    return window.requestAnimationFrame    ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame    ||
	        window.oRequestAnimationFrame      ||
	        window.msRequestAnimationFrame     ||
	        function(callback){
	            window.setTimeout(callback, 1000 / 60);
	        };
	},

	drawMouseCoordinates: function(ctx) {
		var mouseCoords = GameInput.getMouseCoords();
		ctx.save();
			ctx.font = "12px sans";
			ctx.fillText(mouseCoords[0] + ";" + mouseCoords[1], 
				mouseCoords[0] + 10, mouseCoords[1]);
		ctx.restore();
	}

};
