/** 
 * 2D Vector class 
 * All operations return a new Vector2 object (or a number) and treat 
 * the Vector2 as an immutable object (even though x and y can be explicitly set)
 */
function Vector2(x, y) {
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
}

// Static Constants
Vector2.ZERO = new Vector2(0, 0);
Vector2.ONE = new Vector2(1, 1);
Vector2.UP = new Vector2(0, 1);
Vector2.DOWN = new Vector2(0, -1);
Vector2.RIGHT = new Vector2(1, 0);
Vector2.LEFT = new Vector2(-1, 0);

Vector2.prototype = {
	clone: function() {
		return new Vector2(this.x, this.y)
	},

	add: function(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	},

	subtract: function(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	},

	scale: function(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	},

	dot: function(vector) {
		return (this.x * vector.x + this.y + vector.y);
	},

	moveTowards: function(vector, t) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1); // still allow negative t
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	},

	magnitude: function() {
		return Math.sqrt(this.magnitudeSqr());
	},

	magnitudeSqr: function() {
		return (this.x * this.x + this.y * this.y);
	},

	distance: function (vector) {
		return Math.sqrt(this.distanceSqr(vector));
	},

	distanceSqr: function (vector) {
		var deltaX = this.x - vector.x;
		var deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	},

	normalize: function() {
		var mag = this.magnitude();
		if(Math.abs(mag) < 1e-9) {
			return Vector2.ZERO.clone();
		} 
		return this.scale(1/mag);
	},

	angle: function() {
		return Math.atan2(this.y, this.x);
	},

	rotate: function(alpha) {
		var cos = Math.cos(alpha);
		var sin = Math.sin(alpha);
		var x = this.x * cos - this.y * sin;
		var y = this.x * sin + this.y * cos;
		return new Vector2(x, y);
	},

	toPrecision: function(precision) {
		var x = this.x.toFixed(precision);
		var y = this.y.toFixed(precision);
		return new Vector2(x, y);
	},

	toString: function () {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}
};
