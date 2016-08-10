/**
* Handles all keyboard and mouse input events
* Use the observer pattern for mouse click events
*/
"use strict";

define(function (require) {

	var Vector2 = require("maths/Vector2");
	var Camera = require("scene/Camera");

	var pressedKeys = {};
	var mouseDown = [false, false];
	var mouseCoords = Vector2();
	var offset = null;

	// Register observers and notify on click events
	var observers = [];

	function registerObserver(observer) {
		observers.push(observer);
	}

	function init($canvas) {
		offset = $canvas.offset();
		offset.left = Math.round(offset.left);
		offset.top = Math.round(offset.top);

		// Mousemove - canvas is 'behind' the glass panel
		$("#wrapper").mousemove(function(e) {
			mouseCoords.x = e.pageX - offset.left;
			mouseCoords.y = e.pageY - offset.top;
		});

		// + all the other events
		setupInputEvents();
	}

	function setKey(keyCode, active) {
		var key;

		switch(keyCode) {
			case 32:
				key = 'SPACE'; break;
			case 37:
				key = 'LEFT'; break;
			case 38:
				key = 'UP'; break;
			case 39:
				key = 'RIGHT'; break;
			case 40:
				key = 'DOWN'; break;
			default:
				// Convert ASCII codes to letters
				key = String.fromCharCode(keyCode);
		}

		pressedKeys[key] = active;
	}

	function setMouse(mouseButton, active) {
		// mouseButton: 1-left, 2-middle, 3-right
		if(mouseButton == 1) {
			mouseDown[0] = active;
		} else if(mouseButton == 3) {
			mouseDown[1] = active;
		}

		observers.forEach(function(observer) {
			observer.notifyMouse(mouseButton, active);
		});
	}

	function setupInputEvents() {
		$(document).keydown(function(e) {
			setKey(e.which, true);
		});

		$(document).keyup(function(e) {
			setKey(e.which, false);
		});

		$(window).on("blur", function() {
			pressedKeys = {};
		});

		$(document).mousedown(function(e) {
			setMouse(e.which, true);
		});

		$(document).mouseup(function(e) {
			setMouse(e.which, false);
		});

		$(document).contextmenu(function() {
			return false; // prevent from occuring
		});
	}


	function isKeyDown(key) {
		if(key.match(/[a-zA-Z]/)) {
			return (pressedKeys[key.toLowerCase()] || pressedKeys[key.toUpperCase()]);
		}
		return pressedKeys[key];
	}

	function isMouseDown() {
		return mouseDown;
	}

	function getMouseCoords(gameWorldCoords) {
		gameWorldCoords = gameWorldCoords === undefined ? true : gameWorldCoords;
		if(gameWorldCoords) {
			return mouseCoords.add(Camera.getShift());
		}
		return mouseCoords;
	}
	

	return {
		init: init,
		isKeyDown: isKeyDown,
		isMouseDown: isMouseDown,
		getMouseCoords: getMouseCoords,
		registerObserver: registerObserver
	};

});
