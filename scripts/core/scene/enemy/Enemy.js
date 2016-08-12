"use strict";

define(function(require) {

	var Body = require("maths/Body");
	var Gun = require("scene/object/Gun");

	function Enemy(position, direction, playerEnemy) {
		this.body = new Body(position, direction, 50);
		this.health = 100;
		this.gun = new Gun(this);
		this.playerEnemy = playerEnemy;
	}

	Enemy.prototype = {
		render: function(ctx) {
			var center = this.body.position.round();
			ctx.save();
				ctx.fillStyle = "#A5A";
				ctx.beginPath();
				ctx.arc(center.x, center.y, 11, 0, 2 * Math.PI); 
				ctx.fill();

				this.gun.render(ctx, 15);
			ctx.restore();
		},

		update: function(dt) {
			// Move
			this.body.update(dt);

			// Shoot
			this.gun.update(dt);
		},

		/** Gun interface */
		isShooting: function() {
			return true; // non-stop shooting
		},

		/** Gun interface */
		getShootingDirection: function() {
			var playerCoords = this.playerEnemy.body.position;
			var direction = playerCoords.subtract(this.body.position);
			return direction.normalize();
		}
	};

	return Enemy;
});
