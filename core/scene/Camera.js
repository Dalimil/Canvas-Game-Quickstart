/* Single camera in the game 
*  Could either be free-form (strategy games) or following the player
*/
var Camera = (function() {
	var position = Vector2(); // good idea not to use decimals
	var smoothing = 5.5; // e.g. logarithmic (e.g. *0.9 per sec)

	var viewportDimensions = null; // width, height?
	var positionLimits = null; // game world size?
	
	function init(_position) {
		position = _position;
	}

	// Follow player
	function update(dt, player) {
		position = position.moveTowards(player.position, smoothing * dt);
	}

	// TODO
	function transformView(ctx) {
		//ctx.save(); // saves canvas state
		//ctx.translate(x, y);
	}

	// Debug render
	function render(ctx) {
		ctx.save();
			ctx.strokeStyle = '#0E0';
			ctx.strokeRect(Math.round(position.x) - 10, Math.round(position.y) - 10, 20, 20);
		ctx.restore();
	}

	return {
		init: init,
		update: update,
		transformView: transformView,
		render: render
	};

})();
