"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	var GameInput = require("app/GameInput");
	var Gun = require("scene/Gun");
	
	function Player(position) {
		this.position = position;
		this.direction = Vector2.RIGHT();
		this.health = 100;
		this.speed = 180; // Pixel movement speed per second
		this.turnSpeed = 3.2; // Turn/Rotation speed per second
		this.gun = new Gun(this);
		this.controls = { up: ['UP', 'W'], down: ['DOWN', 'S'], left: ['LEFT', 'A'], right: ['RIGHT', 'D'] };
	}

	Player.prototype = {
		update: function(dt) {  // dt is the number of seconds passed since last update
			// Move
			var velocity = this.direction.scale(this.getMovementDirection() * this.speed);
			this.position = this.position.add(velocity.scale(dt));
			
			// Rotate
			this.direction = this.direction.rotate(this.getTurnAngle() * dt);

			// Shoot
			this.gun.update(dt);
		},

		render: function(ctx) {
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
				
				this.gun.render(ctx, 14);
			ctx.restore();
		},

		getMovementDirection: function() {
			var movement = Vector2.ZERO();
			if(this.controls.up.some(function(x) { return GameInput.isKeyDown(x); })) {
				movement = movement.add(Vector2.UP());
			}
			if(this.controls.down.some(function(x) { return GameInput.isKeyDown(x); })) {
				movement = movement.add(Vector2.DOWN());
			}
			// We use alternative controls with only forward/backward indication
			return movement.y; // +1 0 -1
			/*// Alternatively, we could control all 4 directions + vector normalization
			if(this.controls.right.some(function(x) { return GameInput.isKeyDown(x); })) {
				movement = movement.add(Vector2.RIGHT());
			}
			if(this.controls.left.some(function(x) { return GameInput.isKeyDown(x); })) {
				movement = movement.add(Vector2.LEFT());
			}
			return movement.normalize(); */
		},

		getTurnAngle: function() {
			var angle = 0;
			// Note that Canvas Y axis is reversed (+/-)
			if(this.controls.right.some(function(x) { return GameInput.isKeyDown(x); })) {
				angle += this.turnSpeed; 
			}
			if(this.controls.left.some(function(x) { return GameInput.isKeyDown(x); })) {
				angle -= this.turnSpeed;
			}
			return angle;
		}
	};

	return Player;

});

