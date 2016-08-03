function Enemy(position, direction) {
	this.position = position;
	this.direction = direction;
	this.health = 100;
	this.speed = 50;
}

Enemy.prototype = {
	render: function(ctx) {
		var center = this.position.round();
		ctx.save();
			ctx.fillStyle = "#A5A";
			ctx.beginPath();
			ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI); 
			ctx.fill();
		ctx.restore();
	},

	update: function(dt) {
		this.position = this.position.add(this.direction.scale(dt * this.speed));
	}
};
