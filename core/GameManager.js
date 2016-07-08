var GameManager = (function() {

	var width;
	var height;
	var ctx;

	function init(canvas) {
		width = canvas.width;
		height = canvas.height;
		ctx = canvas.getContext("2d");
	}

	// Update game objects.
	function update(dt) { // dt = time passed since last redraw
		
		if(GameInput.isKeyDown('RIGHT')) { // detect which keys are down.
			// dt is the number of seconds passed, so multiplying by
			// the speed gives you the number of pixels to move
			// player.x += playerSpeed * dt;
		}
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
