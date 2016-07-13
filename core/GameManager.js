var GameManager = (function() {

	var width;
	var height;
	var ctx;
	var player;

	function init(canvas) {
		width = canvas.width;
		height = canvas.height;
		ctx = canvas.getContext("2d");
		player = new Player(Vector2(120, 200));
		Camera.init(player.position.clone());
	}

	// Update game objects.
	function update(dt) { // dt = time passed since last redraw
		EnemyManager.update(dt);
		player.update(dt);
		Camera.update(dt, player);
	}

	// Draw everything
	function render() {
		// Clear canvas
		ctx.clearRect(0, 0, width, height);
		ctx.save(); // save to reset state at the end
			// Draw objects
			Environment.render(ctx);
			EnemyManager.render(ctx);
			player.render(ctx);
			Camera.render(ctx); // Debug
			Utils.drawMouseCoordinates(ctx);
		ctx.restore(); // reset styles again
	}

	return {
		init: init,
		update: update,
		render: render
	};

})();
