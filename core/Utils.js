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

	drawMouseCoordinates: function(ctx, cameraShift) {
		var mouseCoords = GameInput.getMouseCoords();
		
		var text = mouseCoords.toString();
		if(cameraShift !== undefined) {
			var worldCoords = mouseCoords.add(cameraShift);
			text += " | " + worldCoords.toString();
		}
		ctx.save();
			ctx.font = "12px sans";
			ctx.fillText(text, mouseCoords.x + 10, mouseCoords.y);
		ctx.restore();
	}

};
