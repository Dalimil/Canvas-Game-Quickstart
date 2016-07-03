/**
* Handles all keyboard and mouse input events
*/
var GameInput = (function() {

	var pressedKeys = {};
	var mouseDown = [false, false];
	var mouseCoords = [0, 0];
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

		// Mousemove
		$canvas.mousemove(function(e) {
			mouseCoords[0] = e.pageX - offset.left;
			mouseCoords[1] = e.pageY - offset.top;
		});
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
			mouseDown[0] = true;
		} else if(mouseButton == 3) {
			mouseDown[1] = true;
		}

		observers.forEach(function(observer) {
			observer.notifyMouse(mouseButton, active);
		});
	}

	$(document).keydown(function(e) {
		setKey(e.which, true);
	});

	$(document).keyup(function(e) {
		setKey(e.which, false);
	});

	$(window).blur(function() {
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


	function isKeyDown(key) {
		return pressedKeys[key];
	}

	function isMouseDown() {
		return mouseDown;
	}

	function getMouseCoords() {
		return mouseCoords;
	}
	

	return {
		init: init,
		isKeyDown: isKeyDown,
		isMouseDown: isMouseDown,
		getMouseCoords: getMouseCoords,
		registerObserver: registerObserver
	};

})();
