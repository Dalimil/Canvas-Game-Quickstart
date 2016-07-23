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
		var worldCoords = GameInput.getMouseCoords();
		var mouseCoords = GameInput.getMouseCoords(false);
		
		var text = mouseCoords.toString() + " | " + worldCoords.toString();
		
		ctx.save();
			ctx.font = "12px sans";
			ctx.fillText(text, mouseCoords.x + 10, mouseCoords.y);
		ctx.restore();
	}

};
