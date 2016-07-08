var MainMenu = (function() {
	
	var $menuScreen = null;

	function init() {
		$menuScreen = $("#menu-wrapper");
		$menuScreen.fadeIn("slow");

		// Setup button click listeners
		var $playButton = $("#menu-play");
		$playButton.click(function() {
			$menuScreen.fadeOut();
			AppManager.unpause();
		});

		var $creditsButton = $("#menu-credits");
		$creditsButton.click(function() {
			console.log("Swap menu screen here"); // todo
		});

		var $leaderboardButton = $("#menu-leaderboard");
		$leaderboardButton.click(function() {
			console.log("Swap menu screen here"); // todo
		});
	}


	return {
		init: init
	};

})();
