"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	var GameInput = require("app/GameInput");
	var Body = require("maths/Body");
	var Gun = require("scene/object/Gun");
	
	function Player(position) {
		this.body = new Body(position, Vector2.RIGHT(), 180); // speed = 180 pix per sec
		this.body.turnSpeed = 3.2; // Turn/Rotation speed per second
		this.health = 100;
		this.gun = new Gun(this, Gun.INTERVAL_FAST, "gunshot");
		this.controls = { up: ['UP', 'W'], down: ['DOWN', 'S'], left: ['LEFT', 'A'], right: ['RIGHT', 'D'] };
		this.activePowerups = [];
	}

	Player.prototype = {
		update: function(dt) {  // dt is the number of seconds passed since last update
			// Move
			this.body.update(dt, this.getMovementDirection()); // with a +1/0/-1 multiplier
			
			// Rotate
			this.body.direction = this.body.direction.rotate(this.getTurnAngle() * dt);

			// Shoot
			this.gun.update(dt);

			// Update Active PowerUps
			for(var i = this.activePowerups.length - 1; i >= 0; i--) {
				var powerup = this.activePowerups[i];
				powerup.timeout -= dt;
				if(powerup.timeout <= 0) {
					// Remove
					this.activePowerups.splice(i, 1);
				}
			};
		},

		render: function(ctx) {
			ctx.save();
				var playerBody = this.body.position.round();
				ctx.fillStyle = "#005";
				ctx.beginPath();
				ctx.arc(playerBody.x, playerBody.y, 10, 0, 2 * Math.PI); 
				ctx.fill();
				
				var playerHead = this.body.position.add(this.body.direction.scale(14)).round();
				ctx.fillStyle = "#000";
				ctx.beginPath();
				ctx.arc(playerHead.x, playerHead.y, 5, 0, 2 * Math.PI);
				ctx.fill();
				
				this.gun.render(ctx, 14);
			ctx.restore();
		},

		/** Gun interface */
		isShooting: function() {
			return GameInput.isMouseDown()[0];
		},

		/** Gun interface */
		getShootingDirection: function() {
			var mouseCoords = GameInput.getMouseCoords();
			var direction = mouseCoords.subtract(this.body.position);
			return direction.normalize();
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
				angle += this.body.turnSpeed; 
			}
			if(this.controls.left.some(function(x) { return GameInput.isKeyDown(x); })) {
				angle -= this.body.turnSpeed;
			}
			return angle;
		}
	};

	return Player;

});

