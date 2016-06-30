/** Single camera in the game */
var Camera = (function() {
	var position = null;
	var smoothing = 1.5; // e.g. logarithmic (e.g. *0.9 per sec)

	function move(target, deltaTime) {
		// movement towards target -> position += vector(target-position) * deltaTime * smoothing;

	}

	return {
		move: move
	};

})();
