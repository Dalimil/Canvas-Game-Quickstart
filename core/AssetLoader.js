var AssetLoader = (function() {
	
	var loadComponents = [];
	var loaded = false;
	var progressBar = null;

	function addLoadFunction(func) {
		if(loaded) return;

		loadComponents.push(func);
	}

	function setProgressBar(value) {
		$progressBar.css("width", value + "%");
	}

	function init($canvas) {
		if(loaded) return;

		$progressBar = $("#load-progress");
		setProgressBar(30);

		loadComponents.forEach(function(component) {
			component.load();
		}
		loaded = true;
	}

	return {
		addLoadFunction: addLoadFunction,
		init: init,
		isLoaded: function() { return loaded; }
	}
})();
