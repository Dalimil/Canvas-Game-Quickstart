"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	var GameInput = require("app/GameInput");
	var Bullet = require("scene/Bullet");

	function Gun(owner) {
		this.owner = owner;
		this.gunTimer = 0;
		this.TIME_BETWEEN_BULLETS = 0.2;
	}

	Gun.prototype = {
		update: function(dt) {
			// Shoot with left mouse button
			this.gunTimer += dt;
			if(GameInput.isMouseDown()[0] && this.gunTimer >= this.TIME_BETWEEN_BULLETS) {
				this.gunTimer = 0;
				this.shoot();
			}
		},

		shoot: function() {
			var bullet = new Bullet(this.owner.body.position, this.getShootingDirection());
			bullet.spawn();
		},

		getShootingDirection: function() {
			var mouseCoords = GameInput.getMouseCoords();
			var direction = mouseCoords.subtract(this.owner.body.position);
			return direction.normalize();
		},

		render: function(ctx, distance) {
			var center = this.owner.body.position
				.add(this.getShootingDirection().scale(distance))
				.round();
			ctx.fillStyle = "#900";
			ctx.fillRect(center.x-4, center.y-4, 8, 8);
		}

	};

	return Gun;

});