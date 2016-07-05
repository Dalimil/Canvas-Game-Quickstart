/* Single camera in the game 
*  Could either be free-form (strategy games) or following the player
*/
var Camera = (function() {
	var position = null; // good idea not to use decimals (and round to ints instead)
	var viewportDimensions = null; // width + height
	var positionLimits = null; // game world size?
	var smoothing = 1.5; // e.g. logarithmic (e.g. *0.9 per sec)

	function move(target, deltaTime) {
		// movement towards target -> position += vector(target-position) * deltaTime * smoothing;

	}

	return {
		move: move
	};

})();
