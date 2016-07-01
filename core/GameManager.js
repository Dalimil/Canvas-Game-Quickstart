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
        
        // Draw objects
        ShapeDrawing.drawRectangles(ctx);
        ShapeDrawing.drawArc(ctx);
        ShapeDrawing.drawText(ctx);
    }

	return {
        init: init
		update: update,
		render: render
	};

})(); // To be initialized with canvas in init.js
