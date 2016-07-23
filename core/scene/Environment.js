var Environment = (function() {
	// World representation

	var gameObjects = []; // particles, power-ups etc.

	function registerGameObject(obj) {
		gameObjects.push(obj);
	}

	function update(dt) {
		gameObjects.forEach(function(obj) {
			obj.update(dt);
		});
	}

	function render(ctx) {
		// Optimize, maybe don't need to redraw that often?
		// draw background first
		// now draw the rest
		gameObjects.forEach(function(obj) {
			obj.render(ctx);
		});
	}

	return {
		registerGameObject: registerGameObject,
		update: update,
		render: render
	};

})();
