"use strict";

define(function(require) {

	function PowerUp(type, position) {
		this.position = position;
		this.type = type;
	}

	PowerUp.TYPE_SPEED_BOOST = "type-fast";
	PowerUp.TYPE_SLOw_DOWN = "type-slow";
	PowerUp.SPEED_BOOST = 100;
	PowerUp.SPEED_DURATION = 2000;

	PowerUp.prototype = {
		onTrigger: function(player) {
			if(this.type == PowerUp.TYPE_SPEED_BOOST) {
				player.speed += PowerUp.SPEED_BOOST;
				player.activePowerups.push(new ActivePowerUp(PowerUp.SPEED_DURATION,
					function() { player.speed -= PowerUp.SPEED_BOOST; })
				);
			} else if(this.type == PowerUp.TYPE_SLOw_DOWN) {
				player.speed -= PowerUp.SPEED_BOOST;
				player.activePowerups.push(new ActivePowerUp(PowerUp.SPEED_DURATION,
					function() { player.speed += PowerUp.SPEED_BOOST; })
				);				
			}
		},

		update: function(dt) {
			// Nothing at the moment
		},

		render: function(ctx) {
			var center = this.position.round();
			ctx.save();
				ctx.fillStyle = "#acc";
				ctx.beginPath();
				ctx.arc(center.x, center.y, 3, 0, 1.5 * Math.PI);
				ctx.fill();
			ctx.restore();
		}
	};


	function ActivePowerUp(timeout, callback) {
		this.timeout = timeout;
		this.callback = callback;
	}

	return PowerUp;

});