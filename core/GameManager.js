var GameManager = (function() {

	var width;
	var height;
	var ctx;
	var player;

	function init(canvas) {
		width = canvas.width;
		height = canvas.height;
		ctx = canvas.getContext("2d");
		player = new Player(ctx, Vector2(120, 200));
	}

	// Update game objects.
	function update(dt) { // dt = time passed since last redraw
		EnemyManager.update(dt);
		player.update(dt);
	}

	// Draw everything
	function render() {
		// Clear canvas
		ctx.clearRect(0, 0, width, height);
		ctx.save(); // save to reset state at the end

		// Draw objects
		ShapeDrawing.drawRectangles(ctx);
		ShapeDrawing.drawArc(ctx);
		ShapeDrawing.drawText(ctx);

		var mouseCoords = GameInput.getMouseCoords();
		ctx.font = "12px sans";
		ctx.fillText(mouseCoords[0] + ";" + mouseCoords[1], mouseCoords[0] + 10, mouseCoords[1]);

		ctx.restore(); // reset styles again
	}

	return {
		init: init,
		update: update,
		render: render
	};

})();
