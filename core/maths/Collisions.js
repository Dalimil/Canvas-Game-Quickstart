var Collisions = (function() {

	var objects = [];

	function registerGameObject(collisionBox, onCollision) {
		objects.push({ box: collisionBox, onCollision: onCollision });
	}

	function update() {
		// compute all collisions here
		
	}

	return {
		registerGameObject: registerGameObject,
		update: update
	};

})();

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