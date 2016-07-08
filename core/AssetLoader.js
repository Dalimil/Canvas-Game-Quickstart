var AssetLoader = (function() {
	
	var loadComponents = [];
	var loaded = false;
	var callback = null;
	var $loadingScreen = null;
	var $progressBar = null;

	function addLoadFunction(func, description) {
		if(loaded) return;

		loadComponents.push({ 
			"f": func, 
			"description": description 
		});
	}

	function setBarProgress(value) {
		$progressBar.css("width", value + "%");
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
		
		setBarProgress(10);
		// only work with range 10 - 90
		loadComponents.forEach(function(component) {
			setBarLabel(component.description);
			component.f();
		});
		
		finishLoading();
	}

	return {
		addLoadFunction: addLoadFunction,
		init: init,
		isLoaded: function() { return loaded; }
	};

})();
