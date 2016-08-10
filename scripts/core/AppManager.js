/**
* Initializes the game loop and pause/resume events
*/
"use strict";

define(function (require, exports, module) {

	var GameManager = require("app/GameManager");
	var GameInput = require("app/GameInput");
	var AssetLoader = require("app/AssetLoader");
	var MainMenu = require("app/MainMenu");
	var Utils = require("app/Utils");

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
		MainMenu.init(function() {
			MainMenu.hide();
			resume();
		});
		/*AssetLoader.init(function() { 
			// Callback function when Loaded
			loaded = true;
			MainMenu.show(); 
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

});
