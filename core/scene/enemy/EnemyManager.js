// Spawning, global coordination etc.
var EnemyManager = (function() {

	var spawnPoints = [
		Vector2(100, 200), 
		Vector2(400, 500), 
		Vector2(750, 200)
	];
	var enemies = [];
	var spawnTimer = 0;
	var spawnPeriod = 1.5;

	function render(ctx) {
		spawnPoints.forEach(function(point) {
			ctx.save();
				ctx.strokeStyle = '#E00';
				ctx.strokeRect(Math.round(point.x) - 10, Math.round(point.y) - 10, 20, 20);
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
		var enemy = new Enemy(spawnPoint.clone(), Vector2.fromPolar(randAngle, 1));
		enemies.push(enemy);
	}

	return {
		render: render,
		update: update
	};
	
})();
