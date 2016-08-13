/**
* Head-up display and status bars
*/
"use strict";

define(function (require) {

	var GameRoundManager = require("app/GameRoundManager");
	var AppManager = require("app/AppManager"); // Careful: it's circular

	var $hudScreen = null;
	var $roundNumberField = null;
	var $roundTimeoutField = null;

	function init() {
		$hudScreen = $("#HUD-wrapper");
		$roundNumberField = $("#hud-top-left");
		$roundTimeoutField = $("#hud-top-middle");

		$("#pause-btn").click(function() {
			AppManager.AppManager.pause();
		});

		show();
	}

	function render() {
		var inTransition = GameRoundManager.isInTransition();
		var roundNumber = GameRoundManager.getRoundNumber();
		var roundTimeout = GameRoundManager.getRoundTimeRemaining();
		
		$roundNumberField.text("Round " + roundNumber);

		if(inTransition) {
			$roundTimeoutField.text("Get Ready");
		} else {
			$roundTimeoutField.text(roundTimeout);
		}
	}

	function show() {
		$hudScreen.fadeIn();
	}

	function hide() {
		$hudScreen.fadeOut();
	}

	return {
		init: init,
		show: show,
		hide: hide,
		render: render
	};

});
