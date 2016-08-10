"use strict";

define(function(require) {
	
	var $menuScreen = null;

	function init(clickPlayCallback) {
		$menuScreen = $("#menu-wrapper");
		
		// Setup button click listeners
		var $playButton = $("#menu-play");
		$playButton.click(function() {
			clickPlayCallback();
		});

		var $creditsButton = $("#menu-credits");
		$creditsButton.click(function() {
			console.log("Swap menu screen here"); // todo
		});

		var $leaderboardButton = $("#menu-leaderboard");
		$leaderboardButton.click(function() {
			console.log("Swap menu screen here"); // todo
		});

		// TODO - uncomment - AudioManager.playAmbient();
	}

	function show() {
		$menuScreen.fadeIn("slow");
	}

	function hide() {
		$menuScreen.fadeOut();
	}

	return {
		init: init,
		show: show,
		hide: hide
	};

});
