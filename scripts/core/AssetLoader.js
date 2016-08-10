"use strict";

define(function() {
	
	var loadComponents = [];
	var numComponentsToLoad = null;
	var progressBarValue = 0;
	var loaded = false;
	var callback = null;
	var $loadingScreen = null;
	var $progressBar = null;

	function addLoadFunction(func) {
		if(loaded) return;
		
		// func should take 2 callbacks for done() and tick()
		loadComponents.push({ f: func });
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
			component.f(function() { // done()
				numComponentsToLoad -= 1;
				if(numComponentsToLoad <= 0) {
					finishLoading();
				}
			}, function(piecesTotal) { // tick()
				increaseBarProgress(portion / piecesTotal);
			});
		});
	}

	return {
		addLoadFunction: addLoadFunction,
		init: init,
		isLoaded: function() { return loaded; }
	};

});
