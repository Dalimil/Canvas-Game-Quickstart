var GameManager = (function(canvas) {

    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");

	// Update game objects.
    function update(dt) { // dt = time passed since last redraw
        
        if(GameInput.isDown('RIGHT')) { // detect which keys are down.
            // dt is the number of seconds passed, so multiplying by
            // the speed gives you the number of pixels to move
            // player.x += playerSpeed * dt;
        }
    }

    // Draw everything
    function render() {
        ShapeDrawing.drawRectangles(ctx);
        ShapeDrawing.drawArc(ctx);
        ShapeDrawing.drawText(ctx);
    }

	return {
		update: update,
		render: render
	};

}); // To be initialized with canvas in init.js
