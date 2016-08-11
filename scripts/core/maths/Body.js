/**
 * This is a definition of a genery physics body
 */
"use strict";

define(function(require) {

	var Vector2 = require("maths/Vector2");
	
	function Body(position, direction, speed) {
		this.position = position;
		this.direction = (direction === undefined) ? Vector2.LEFT() : direction;
		this.speed = (speed === undefined) ? 0 : speed;
		this.turnSpeed = 0;
		this.gravity = 0;
		this.collider = null;
	}

	Body.prototype = {

		setGravity: function(gravity) {
			this.gravity = gravity;
		},

		setCollider: function(collider) {
			this.collider = collider;
		},

		update: function(dt, multiplier) {
			var velocity = this.direction.scale(this.speed * multiplier);
			this.position = this.position.add(velocity.scale(dt));
		}
	};

	return Body;

});