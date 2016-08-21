"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	var GameInput = require("app/GameInput");
	var Bullet = require("scene/object/Bullet");
	var AudioManager = require("app/AudioManager");

	function Gun(owner, fireInterval) {
		this.owner = owner;
		this.gunTimer = 0;
		this.FIRE_INTERVAL = fireInterval || Gun.INTERVAL_SLOW;
	}

	Gun.INTERVAL_SLOW = 0.7;
	Gun.INTERVAL_FAST = 0.2;

	Gun.prototype = {
		update: function(dt) {
			// Shoot with left mouse button
			this.gunTimer += dt;
			if(this.owner.isShooting() && this.gunTimer >= this.FIRE_INTERVAL) {
				this.gunTimer = 0;
				this.shoot();
			}
		},

		shoot: function() {
			var bullet = new Bullet(this.owner.body.position.clone(),
				this.owner.getShootingDirection());
			bullet.spawn();

			// AudioManager.play("gunshot");
		},

		render: function(ctx, distance) {
			var center = this.owner.body.position
				.add(this.owner.getShootingDirection().scale(distance))
				.round();
			ctx.fillStyle = "#900";
			ctx.fillRect(center.x-4, center.y-4, 8, 8);
		}

	};

	return Gun;

});