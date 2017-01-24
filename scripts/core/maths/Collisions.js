"use strict";

define(function() {

	var objects = [];

	function registerGameObject(collisionBox, onCollision) {
		objects.push({ collider: collisionBox, onCollision: onCollision });
	}
/*
	function areColliding(colliderA, colliderB) {
		if (colliderA.x1 < colliderB.x2 && colliderA.x2 > colliderB.x1 &&
			colliderA.y1 < colliderB.y2 && colliderA.y2 > colliderB.y1) {
			// todo: return collision details instead
			return true;
		} 
		return null;
	}*/

	function update() {
		// compute all collisions here
	/*	objects.forEach(function(objectA) {
			objects.forEach(function(objectB) {
				if (objectA == objectB) {
					return;
				}
				var collision = areColliding(objectA.collider, objectB.collider);
				if (collision != null) {
					objectA.onCollision(collision);
					objectB.onCollision(collision);
				}
			});
		});*/
	}

	return {
		registerGameObject: registerGameObject,
		update: update
	};

});

// Separating Axis Theorem
// - find if 2 polygons overlap and push them back to resolve the collision
// - There has to be an additional circle vs circle test and also circle vs
//   polygon can be done this way but need to consider the axis from circle centre
//   and polygon vertex closest to the circle

// For collisions - there are two approaches
/*
1) In each step, test all pairs of object for collisions
  - dummy n^2
  - optimise: bounding boxes (for complex objects and polygons) -> convert to intervals -> sweep (n*log(n))

2) Prior - precompute all future collisions in n^2
  - create an event time-priority queue (in update method deque based on time)
  - separate 'draw' and 'update' operations - each update updates new values for only a pair of objects - taken O(n) time
*/