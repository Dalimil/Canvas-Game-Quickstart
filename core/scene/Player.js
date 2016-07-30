function Player(position) {
	this.position = position;
	var health = 100;
	var speed = 200; // Pixel movement speed per second
	var turnSpeed = 50; // Turn/Rotation speed
	var gunTimer = 0;
	var timeBetweenBullets = 0.2;
	var controls = { up: ['UP', 'W'], down: ['DOWN', 'S'], left: ['LEFT', 'A'], right: ['RIGHT', 'D'] };

	// We won't have too many players so it's OK to attach methods here

	this.update = function(dt) {  // dt is the number of seconds passed since last update
		// Move
		var movement = getMovementVector().scale(dt * speed);
		this.position = this.position.add(movement); // move

		// Shoot with left mouse button
		gunTimer += dt;
		if(GameInput.isMouseDown()[0] && gunTimer >= timeBetweenBullets) {
			gunTimer = 0;
			shoot.call(this);
		}
	};

	this.getFacingDirection = function() {
		var mouseCoords = GameInput.getMouseCoords();
		var direction = mouseCoords.subtract(this.position);
		return direction.normalize();
	};

	this.render = function(ctx) {
		ctx.save();
			ctx.fillStyle = "#005";
			ctx.beginPath();
			ctx.arc(Math.round(this.position.x), Math.round(this.position.y), 10, 0, 2 * Math.PI); 
			ctx.fill();

			var playerHead = this.position.add(this.getFacingDirection().scale(14));
			ctx.fillStyle = "#000";
			ctx.fillRect(playerHead.x-4, playerHead.y-4, 8, 8);
		ctx.restore();
	};

	function getMovementVector() {
		var movement = new Vector2(0, 0);
		if(controls.right.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.RIGHT);
		}
		if(controls.left.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.LEFT);
		}
		if(controls.up.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.DOWN);
		}
		if(controls.down.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.UP);
		}
		return movement.normalize();
	}

	// TODO: Not used at the moment - use when LEFT - RIGHT keys should rotate the player
	// Use with player.direction like this: this.direction.rotateBy(angle * dt)
	function getTurnAngle() {
		var angle = 0;
		if(controls.right.some(function(x) { return GameInput.isKeyDown(x); })) {
			angle -= turnSpeed;
		}
		if(controls.left.some(function(x) { return GameInput.isKeyDown(x); })) {
			angle += turnSpeed;
		}
		return angle;
	}

	function shoot() {
		var b = new Bullet(this.position, this.getFacingDirection());
		b.spawn();
	}
}
