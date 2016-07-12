function Player(context, position) {
	var ctx = context; // canvas drawing context
	var position = position;
	var health = 100;
	var speed = 10; // Speed per second
	var gunTimer = 0;
	var timeBetweenBullets = 0.5;

	// We won't have too many players so it's OK to attach methods here

	this.update = function(dt) {  // dt is the number of seconds passed since last update
		// Move
		var movement = getMovementVector().multiply(dt * speed);
		position = position.add(movement); // move

		// Shoot with left mouse button
		gunTimer += dt;
		if(GameInput.isMouseDown[0] && gunTimer >= timeBetweenBullets) {
			gunTimer = 0;
			shoot();
		}
	};

	this.draw = function() {
		ctx.save();
			ctx.fillStyle = "#005";
			ctx.beginPath();
			ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI); 
			ctx.fill();
		ctx.restore();
	};

	function getMovementVector() {
		var movement = new Vector2(0, 0);
		if(GameInput.isKeyDown('RIGHT')) { // detect which keys are down.
			movement = movement.add(Vector2.RIGHT);
		}
		if(GameInput.isKeyDown('LEFT')) {
			movement = movement.add(Vector2.LEFT);
		}
		if(GameInput.isKeyDown('UP')) {
			movement = movement.add(Vector2.UP);
		}
		if(GameInput.isKeyDown('DOWN')) {
			movement = movement.add(Vector2.DOWN);
		}
		return movement.normalize();
	},

	function shoot() {
		// TODO
		console.log("TODO: shoot now");
	}
}
