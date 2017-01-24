"use strict";

define(function(require) {

	var Body = require("maths/Body");
	var Rectangle = require("maths/Rectangle");
	var Environment = require("scene/Environment");
	var Collisions = require("maths/Collisions");

	function Bullet(position, direction) {
		this.body = new Body(position, direction, 400);
		this.body.setCollider(Rectangle(this.body.position, 2, 2));
		this.spawned = false;
	}

	Bullet.prototype = {
		spawn: function() {
			if(!this.spawned) {
				Environment.registerGameObject(this); // bullet now exists + is rendered
				Collisions.registerGameObject(this.body.collider, this.onCollision.bind(this));
				this.spawned = true;
			}
		},

		update: function(dt) {
			if(this.spawned) {
				this.body.update(dt);
			}
		},

		onCollision: function(collision) {
			// Animator.createExplosion(collision);

			// todo: properly delete
			this.body.collider = null;
			this.spawned = false;
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
