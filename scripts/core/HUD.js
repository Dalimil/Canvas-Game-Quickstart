/**
* Head-up display and status bars
*/
"use strict";

define(function (require) {

	var GameRoundManager = require("app/GameRoundManager");
	var AudioManager = require("app/AudioManager");

	var $hudScreen = null;
	var $roundNumberField = null;
	var $roundTimeoutField = null;
	var $playerHealth = null;
	var $playerMana = null;

	function init(onpause) {
		$hudScreen = $("#hud-wrapper");
		$roundNumberField = $("#hud-top-left");
		$roundTimeoutField = $("#hud-top-middle");
		$playerHealth = $("#health-bar");
		$playerMana = $("#mana-bar");

		$("#pause-btn").click(function() {
			onpause();
		});

		$("#mute-btn").click(function() {
			if(AudioManager.isMuted()) {
				AudioManager.unmute();
				$(this).children().removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up");
			} else {
				AudioManager.mute();
				$(this).children().removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off");
			}
		});
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

	function setPlayerHealth(fraction) {
		$playerHealth.css("width", fraction + "%");
	}

	function setPlayerMana(fraction) {
		$playerMana.css("width", fraction + "%");
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
		render: render,
		setPlayerHealth: setPlayerHealth,
		setPlayerMana: setPlayerMana
	};

});
