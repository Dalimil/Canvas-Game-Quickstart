function Enemy(position, direction) {
	this.position = position;
	this.direction = direction;
	this.health = 100;
	this.speed = 50;
}

Enemy.prototype = {
	render: function(ctx) {
		ctx.save();
			ctx.fillStyle = "#A5A";
			ctx.beginPath();
			ctx.arc(Math.round(this.position.x), Math.round(this.position.y), 10, 0, 2 * Math.PI); 
			ctx.fill();
		ctx.restore();
	},

	update: function(dt) {
		this.position = this.position.add(this.direction.scale(dt * this.speed));
	}
};
