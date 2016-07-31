function Player(position) {
	this.position = position;
	this.direction = Vector.RIGHT();
	var health = 100;
	var speed = 200; // Pixel movement speed per second
	var turnSpeed = 1.5; // Turn/Rotation speed per second
	var gunTimer = 0;
	var timeBetweenBullets = 0.2;
	var controls = { up: ['UP', 'W'], down: ['DOWN', 'S'], left: ['LEFT', 'A'], right: ['RIGHT', 'D'] };

	this.update = function(dt) {  // dt is the number of seconds passed since last update
		// Rotate
		this.direction = this.direction.rotateBy(getTurnAngle() * dt);
		// Move
		var velocity = this.direction.scale(getMovementDirection() * speed);
		this.position = this.position.add(velocity.scale(dt));

		// Shoot with left mouse button
		gunTimer += dt;
		if(GameInput.isMouseDown()[0] && gunTimer >= timeBetweenBullets) {
			gunTimer = 0;
			shoot.call(this);
		}
	};

	this.getShootingDirection = function() {
		var mouseCoords = GameInput.getMouseCoords();
		var direction = mouseCoords.subtract(this.position);
		return direction.normalize();
	};

	this.render = function(ctx) {
		ctx.save();
			var playerBody = this.position.round();
			ctx.fillStyle = "#005";
			ctx.beginPath();
			ctx.arc(playerBody.x, playerBody.y, 10, 0, 2 * Math.PI); 
			ctx.fill();
			
			var playerHead = this.position.add(this.direction.scale(14)).round();
			ctx.fillStyle = "#000";
			ctx.beginPath();
			ctx.arc(playerHead.x, playerHead.y, 5, 0, 2 * Math.PI);
			ctx.fill();
			
			var playerGun = this.position.add(this.getShootingDirection().scale(14)).round();
			ctx.fillStyle = "#000";
			ctx.fillRect(playerGun.x-4, playerGun.y-4, 8, 8);
		ctx.restore();
	};

	function getMovementDirection() {
		var movement = Vector2.ZERO();
		if(controls.up.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.DOWN());
		}
		if(controls.down.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.UP());
		}
		// We use alternative controls with only forward/backward indication
		return movement.y; // +1 0 -1
		/*// Alternatively, we could control all 4 directions + vector normalization
		if(controls.right.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.RIGHT());
		}
		if(controls.left.some(function(x) { return GameInput.isKeyDown(x); })) {
			movement = movement.add(Vector2.LEFT());
		}
		return movement.normalize(); */
	}

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
		var b = new Bullet(this.position, this.getShootingDirection());
		b.spawn();
	}
}

