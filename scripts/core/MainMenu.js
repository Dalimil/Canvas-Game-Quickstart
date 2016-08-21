"use strict";

define(function(require) {
	
	var AudioManager = require("app/AudioManager");

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
	}

	function show() {
		$menuScreen.fadeIn("slow");
		AudioManager.play("menu");
	}

	function hide() {
		$menuScreen.fadeOut();
		AudioManager.stop("menu");
	}

	return {
		init: init,
		show: show,
		hide: hide
	};

});
