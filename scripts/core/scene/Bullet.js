"use strict";

define(function(require) {

	var Body = require("maths/Body");
	var Environment = require("scene/Environment");

	function Bullet(position, direction) {
		this.body = new Body(position, direction, 400);
		this.spawned = false;
	}

	Bullet.prototype = {
		spawn: function() {
			if(!this.spawned) {
				Environment.registerGameObject(this); // bullet now exists + is rendered
				//Collisions.registerGameObject(this); // collision events
				this.spawned = true;
			}
		},

		update: function(dt) {
			if(this.spawned) {
				this.body.update(dt);
			}
		},

		onCollision: function(other, collision) {
			// Animator.createExplosion(collision);

			// TODO: destroy bullet
		},

		render: function(ctx) {
			if(!this.spawned) return;

			var center = this.body.position.round();
			ctx.save();
				ctx.fillStyle = "#222";
				ctx.beginPath();
				ctx.arc(center.x, center.y, 3, 0, 2 * Math.PI); 
				ctx.fill();
			ctx.restore();
		}

	};

	return Bullet;

});
