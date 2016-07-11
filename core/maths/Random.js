var Random = {

	// Returns a random number between 0 (inclusive) and 1 (exclusive)
	random: function() {
	  return Math.random();
	},

	// Returns a random number between min (inclusive) and max (exclusive)
	randomRange: function(min, max) {
	  return Math.random() * (max - min) + min;
	},

	// Returns a random integer between min (included) and max (included)
	// Using Math.round() would give a non-uniform distribution!
	randomInt: function(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};