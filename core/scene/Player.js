function Player(position) {
	this.position = position;
	var health = 100;
	var speed = 200; // Speed per second
	var gunTimer = 0;
	var timeBetweenBullets = 0.5;
	var controls = { up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT' };

	// We won't have too many players so it's OK to attach methods here

	this.update = function(dt) {  // dt is the number of seconds passed since last update
		// Move
		var movement = getMovementVector().scale(dt * speed);
		this.position = this.position.add(movement); // move

		// Shoot with left mouse button
		gunTimer += dt;
		if(GameInput.isMouseDown[0] && gunTimer >= timeBetweenBullets) {
			gunTimer = 0;
			shoot();
		}
	};

	this.render = function(ctx) {
		ctx.save();
			ctx.fillStyle = "#005";
			ctx.beginPath();
			ctx.arc(Math.round(this.position.x), Math.round(this.position.y), 10, 0, 2 * Math.PI); 
			ctx.fill();
		ctx.restore();
	};

	function getMovementVector() {
		var movement = new Vector2(0, 0);
		if(GameInput.isKeyDown(controls.right)) { // detect which keys are down.
			movement = movement.add(Vector2.RIGHT);
		}
		if(GameInput.isKeyDown(controls.left)) {
			movement = movement.add(Vector2.LEFT);
		}
		if(GameInput.isKeyDown(controls.up)) {
			movement = movement.add(Vector2.DOWN);
		}
		if(GameInput.isKeyDown(controls.down)) {
			movement = movement.add(Vector2.UP);
		}
		return movement.normalize();
	}

	function shoot() {
		// TODO
		console.log("TODO: shoot now");
	}
}
