"use strict";

define(function(require) {

	var Camera = require("scene/Camera");
	var Environment = require("scene/Environment");
	var Player = require("scene/Player");
	var EnemyManager = require("scene/enemy/EnemyManager");
	var GameInput = require("app/GameInput");
	var Utils = require("app/Utils");
	var Vector2 = require("maths/Vector2");
	
	var width;
	var height;
	var ctx;
	var player;

	function init(canvas) {
		width = canvas.width;
		height = canvas.height;
		ctx = canvas.getContext("2d");

		var position = Vector2(120, 200);
		player = new Player(position.clone());
		Camera.init(position.clone());
		Environment.init(width, height);
	}

	// Update game objects.
	function update(dt) { // dt = time passed since last redraw
		EnemyManager.update(dt);
		player.update(dt);
		Environment.update(dt);
		Camera.update(dt, player);
	}

	// Draw everything
	function render() {
		// Clear canvas
		ctx.clearRect(0, 0, width, height);
		ctx.save(); // save to reset state at the end
			// Draw objects
			ctx.save();
			Camera.transformView(ctx);
				// Draw objects dependent on camera position
				Environment.render(ctx);
				EnemyManager.render(ctx);
				player.render(ctx);
				Camera.render(ctx); // Debug
			ctx.restore();

			Utils.drawMouseCoordinates(ctx, GameInput.getMouseCoords(), 
				GameInput.getMouseCoords(false));
		ctx.restore(); // reset styles again
	}

	return {
		init: init,
		update: update,
		render: render
	};

});
