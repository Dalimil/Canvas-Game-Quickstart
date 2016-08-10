/**
* Initializes the game loop and pause/resume events
*/
var AppManager = (function() {

	var loaded = false;
	var running = false;
	var lastTimestamp;
	var requestAnimFrame = Utils.getRequestAnimationFrame(); // cross-browser

	$(window).on("load", init); // onload

	function init() {
		// Initialize components by passing the canvas object
		var $canvas = $("#canvas");
		GameManager.init($canvas[0]);
		GameInput.init($canvas);
		/*AssetLoader.init(function() { 
			loaded = true;
			MainMenu.init(); // Callback function when Loaded
		});*/
			// start debug  /////////////////////
				loaded = true;
				resume(); // todo - remove - main-menu skip - fix
			// end debug //////////////////////////
	}

	function pause() {
		running = false;
	}

	function resume() {
		if(loaded) {
			running = true;
			lastTimestamp = performance.now();
			requestAnimFrame(main);
		}
	}

	// The main game loop
	// @param timestamp - DOMHighResTimeStamp
	function main(timestamp) {
		if(!running) {
			return;
		}
		requestAnimFrame(main); // Best practice (Mozilla)

		var delta = (timestamp - lastTimestamp)/1000;
		lastTimestamp = timestamp; // ready for the next frame
		
		GameManager.update(delta);
		GameManager.render();
	}

	return {
		pause: pause,
		resume: resume,
		isRunning: function() { return running; }
	};

})();
