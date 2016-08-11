"use strict";

define(function(require) {

	var Body = require("maths/Body");

	function Enemy(position, direction) {
		this.body = new Body(position, direction, 50);
		this.health = 100;
	}

	Enemy.prototype = {
		render: function(ctx) {
			var center = this.body.position.round();
			ctx.save();
				ctx.fillStyle = "#A5A";
				ctx.beginPath();
				ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI); 
				ctx.fill();
			ctx.restore();
		},

		update: function(dt) {
			this.body.update(dt);
		}
	};

	return Enemy;
});
