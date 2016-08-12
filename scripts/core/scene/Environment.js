"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	var Camera = require("scene/Camera");
	var PowerUp = require("scene/object/PowerUp");
	
	// World representation
	var gameObjects = []; // particles, power-ups etc.
	
	var boundaries = [
		Vector2(-50, 200),
		Vector2(500, -100),
		Vector2(800, 0),
		Vector2(900, 200),
		Vector2(600, 700),
		Vector2(100, 500)
	];

	var canvasWidth;
	var canvasHeight;

	function init(width, height) {
		canvasHeight = height;
		canvasWidth = width;
		registerGameObject(new PowerUp(PowerUp.TYPE_SPEED_BOOST, Vector2(300, 470)));
		registerGameObject(new PowerUp(PowerUp.TYPE_SPEED_BOOST, Vector2(700, 400)));
		registerGameObject(new PowerUp(PowerUp.TYPE_SLOw_DOWN, Vector2(300, 200)));
		registerGameObject(new PowerUp(PowerUp.TYPE_SLOw_DOWN, Vector2(500, 50)));
	}

	function registerGameObject(obj) {
		gameObjects.push(obj);
	}

	function update(dt) {
		gameObjects.forEach(function(obj) {
			obj.update(dt);
		});
	}

	function drawBoundaries(ctx) {
		ctx.save();
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = "#222";
			ctx.fillStyle = "#fee";
			boundaries.forEach(function(point) {
				ctx.lineTo(point.x, point.y);
			});
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		ctx.restore();
	}

	function render(ctx) {
		// draw background first
		ctx.save();
			var shift = Camera.getShift();
			ctx.fillStyle = "#aaf";
			ctx.fillRect(shift.x - 5, shift.y - 5,
				canvasWidth + 10, canvasHeight + 10);
		ctx.restore();

		drawBoundaries(ctx);
		// now draw the rest
		gameObjects.forEach(function(obj) {
			obj.render(ctx);
		});
	}

	return {
		init: init,
		registerGameObject: registerGameObject,
		update: update,
		render: render
	};

});
