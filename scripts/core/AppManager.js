/**
* Initializes the game loop and pause/resume events
*/
"use strict";

define(function (require, exports, module) {

	var GameManager = require("app/GameManager");
	var GameInput = require("app/GameInput");
	var AudioManager = require("app/AudioManager");
	var AssetLoader = require("app/AssetLoader");
	var MainMenu = require("app/MainMenu");
	var Utils = require("app/Utils");
	var HUD = require("app/HUD");

	var loaded = false;
	var running = false;
	var lastTimestamp;
	var requestAnimFrame = Utils.getRequestAnimationFrame(); // cross-browser

	function init() {
		$(document).ready(onDomReady);
	}

	function onDomReady() {
		// Initialize components by passing the canvas object
		var $canvas = $("#canvas");
		GameManager.init($canvas[0]);
		GameInput.init($canvas);
		AudioManager.init();
		HUD.init(pause);
		MainMenu.init(function() {
			MainMenu.hide();
			resume();
		});
		/*
		AssetLoader.init(function() { 
			// Callback when Loaded
			loaded = true;
			MainMenu.show(); 
		});//*/
			//* start debug  /////////////////////
				loaded = true;
				resume(); // todo - remove - skip main-menu hack
			// end debug /////////////////////////*/
	}

	function pause() {
		running = false;
		HUD.hide();
		MainMenu.show();
	}

	function resume() {
		if(loaded) {
			running = true;
			lastTimestamp = performance.now();
			requestAnimFrame(main);
			HUD.show();
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

	exports.AppManager = {
		init: init,
		pause: pause,
		resume: resume,
		isRunning: function() { return running; }
	};

});
