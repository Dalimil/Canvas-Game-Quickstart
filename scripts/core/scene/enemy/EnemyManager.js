// Spawning, global coordination etc.
"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	var Random = require("maths/Random");
	var Enemy = require("scene/enemy/Enemy");

	var spawnPoints = [
		Vector2(100, 200), 
		Vector2(400, 500), 
		Vector2(750, 200)
	];
	var enemies = [];
	var spawnTimer = 0;
	var spawnPeriod = 1.5;

	// Reference to the player (know whom to chase)
	var player = null;

	function init(_player) {
		player = _player;
	}

	function render(ctx) {
		spawnPoints.forEach(function(point) {
			var center = point.round();
			ctx.save();
				ctx.strokeStyle = '#E00';
				ctx.strokeRect(center.x - 10, center.y - 10, 20, 20);
			ctx.restore();
		});

		enemies.forEach(function(enemy) {
			enemy.render(ctx);
		});
	}

	function update(dt) { 
		spawnTimer += dt;
		if(spawnTimer >= spawnPeriod) {
			spawnTimer -= spawnPeriod;
			spawnSingle();
		}

		enemies.forEach(function(enemy) {
			enemy.update(dt);
		});
	}

	function spawnSingle() {
		var randIndex = Random.randomInt(0, spawnPoints.length - 1);
		var spawnPoint = spawnPoints[randIndex];
		var randAngle = Random.randomAngle();
		var enemy = new Enemy(spawnPoint.clone(), Vector2.fromPolar(randAngle, 1), player);
		enemies.push(enemy);
	}

	return {
		init: init,
		render: render,
		update: update
	};
	
});
