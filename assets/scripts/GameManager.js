var GameManager = (function() {

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
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

	return {
		update: update,
		render: render
	};

})();
