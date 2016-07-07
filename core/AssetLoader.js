var AssetLoader = (function() {
	
	var loadComponents = [];
	var loaded = false;

	function addLoadFunction(func) {
		if(loaded) return;

		loadComponents.push(func);
	}

	function init($canvas) {
		if(loaded) return;

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
