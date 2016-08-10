/**
 * This is a simple object definition with various helper functions.
*/
"use strict";

define(function() {
	
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

		drawMouseCoordinates: function(ctx, worldCoords, mouseCoords) {
			var text = "w" + worldCoords.toString() + "; m" + mouseCoords.toString();
			
			ctx.save();
				ctx.font = "12px sans";
				ctx.fillText(text, mouseCoords.x + 10, mouseCoords.y);
			ctx.restore();
		}
	};

	return Utils;
	
});
