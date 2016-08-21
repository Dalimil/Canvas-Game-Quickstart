"use strict";

define(function() {
	
	var loadComponents = [];
	var numComponentsToLoad = null;
	var progressBarValue = 0;
	var loaded = false;
	var callback = null;
	var $loadingScreen = null;
	var $progressBar = null;

	function addLoadFunction(loadFunc, piecesToLoad) {
		if(loaded) return;
		
		// func should take a tick() callback
		loadComponents.push({
			load: loadFunc,
			piecesToLoad: piecesToLoad,
			totalPieces: piecesToLoad
		});
	}

	function setBarProgress(value) {
		progressBarValue = value;
		$progressBar.css("width", value + "%");
	}

	function increaseBarProgress(value) {
		setBarProgress(Math.min(90, progressBarValue + value));
	}

	function setBarLabel(label) {
		$progressBar.html(label);
	}

	function finishLoading() {
		loaded = true;
		setBarProgress(100);
		setBarLabel("");
		setTimeout(function() {
			$loadingScreen.fadeOut();
			callback();
		}, 1000);
	}

	function init(cb) {
		if(loaded) return;

		callback = cb;
		$loadingScreen = $("#load-wrapper");
		$progressBar = $("#load-progress");
		$loadingScreen.fadeIn("slow");
		
		numComponentsToLoad = loadComponents.length;
		setBarProgress(10);
		// Only work with the range 10 - 90
		var portion = 80 / numComponentsToLoad;

		// Fire loaders of all and start collecting (via callbacks)
		loadComponents.forEach(function(component) {
			component.load(function() { // tick()
				component.piecesToLoad -= 1;
				increaseBarProgress(portion / component.totalPieces);
				if(component.piecesToLoad <= 0) {
					numComponentsToLoad -= 1;
					if(numComponentsToLoad <= 0) {
						finishLoading();
					}
				}
			});
		});
	}

	return {
		addLoadFunction: addLoadFunction,
		init: init,
		isLoaded: function() { return loaded; }
	};

});
