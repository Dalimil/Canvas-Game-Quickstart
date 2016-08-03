/* Single camera in the game 
*  Could either be free-form (strategy games) or following the player
*/
var Camera = (function() {
	var canvasOffset = Vector2(); // fixed distance from canvas border
	var position = Vector2(); // good idea not to use decimals
	var shift = Vector2(); // position and offset difference
	var smoothing = 5.5; // e.g. logarithmic (e.g. *0.9 per sec)

	var viewportDimensions = null; // width, height?
	var positionLimits = null; // game world size?
	
	function init(_position) {
		canvasOffset = _position;
		position = _position;
	}

	// Follow player
	function update(dt, player) {
		position = position.moveTowards(player.position, smoothing * dt);
		shift = position.subtract(canvasOffset); // shift vector
	}

	// Transforms canvas - simulates camera movement
	function transformView(ctx) {
		var rShift = shift.round();
		ctx.translate(-rShift.x, -rShift.y); // shift opposite
	}

	// Debug render
	function render(ctx) {
		var center = position.round();
		ctx.save();
			ctx.strokeStyle = '#0E0';
			ctx.strokeRect(center.x - 10, center.y - 10, 20, 20);
		ctx.restore();
	}

	return {
		init: init,
		update: update,
		transformView: transformView,
		render: render,
		getShift: function() { return shift.round(); }
	};

})();
