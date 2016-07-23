function Bullet(position, direction) {
	this.position = position;
	this.direction = direction;
	this.speed = 400; // split direction and speed - speed not configurable
	this._spawned = false;
}

Bullet.prototype = {
	spawn: function() {
		if(!this._spawned) {
			Environment.registerGameObject(this); // bullet now exists + is rendered
			//Collisions.registerGameObject(this); // collision events
			this._spawned = true;
		}
	},

	update: function(dt) {
		if(this._spawned) {
			var movement = this.direction.scale(dt * this.speed);
			this.position = this.position.add(movement);
		}
	},

	onCollision: function(other, collision) {
		// Animator.createExplosion(collision);

		// TODO: destroy bullet
	},

	render: function(ctx) {
		if(!this._spawned) return;

		ctx.save();
			ctx.fillStyle = "#222";
			ctx.beginPath();
			ctx.arc(Math.round(this.position.x), Math.round(this.position.y), 3, 0, 2 * Math.PI); 
			ctx.fill();
		ctx.restore();
	}

};
