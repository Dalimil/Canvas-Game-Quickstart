// Spawning, global coordination etc.
var EnemyManager = (function() {

	var context; // Canvas context

	var spawnPoints = [
		Vector2(10, 20), 
		Vector2(50, 80), 
		Vector2(200, 300)
	];
	var enemies = [];
	var spawnTimer = 0;
	var spawnPeriod = 3.0;

	function init(ctx) {
		context = ctx;
	}

	function update(dt) { 
		spawnTimer += dt;
		if(spawnTimer >= spawnPeriod) {
			spawnTimer -= spawnPeriod;
			spawnSingle();
		}
	}

	function spawnSingle() {
		var randIndex = Random.randomInt(0, spawnPoints.length - 1);
		var spawnPoint = spawnPoints[randIndex];
		var enemy = new Enemy(spawnPoint);
	}

	return {
		init: init,
		update: update
	};
	
})();
