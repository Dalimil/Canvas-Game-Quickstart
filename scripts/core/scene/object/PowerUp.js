"use strict";

define(function(require) {

	function PowerUp(type, position) {
		this.position = position;
		this.type = type;
	}

	PowerUp.TYPE_SPEED_BOOST = "type-fast";
	PowerUp.TYPE_SLOw_DOWN = "type-slow";
	PowerUp.SPEED_BOOST = 100;
	PowerUp.SPEED_POWERUP_DURATION = 2000;

	PowerUp.prototype = {
		onTrigger: function(player) {
			if(this.type == PowerUp.TYPE_SPEED_BOOST) {
				player.body.speed += PowerUp.SPEED_BOOST;
				player.activePowerups.push(new ActivePowerUp(
					PowerUp.SPEED_POWERUP_DURATION,
					function() { player.body.speed -= PowerUp.SPEED_BOOST; })
				);
			} else if(this.type == PowerUp.TYPE_SLOw_DOWN) {
				player.body.speed -= PowerUp.SPEED_BOOST;
				player.activePowerups.push(new ActivePowerUp(
					PowerUp.SPEED_POWERUP_DURATION,
					function() { player.body.speed += PowerUp.SPEED_BOOST; })
				);
			}
		},

		update: function(dt) {
			// Nothing at the moment
		},

		render: function(ctx) {
			var center = this.position.round();
			ctx.save();
				ctx.fillStyle = "#ff3";
				ctx.strokeStyle = "#000";
				ctx.beginPath();
				ctx.arc(center.x, center.y, 6, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			ctx.restore();
		}
	};


	function ActivePowerUp(timeout, callback) {
		this.timeout = timeout;
		this.callback = callback;
	}

	return PowerUp;

});