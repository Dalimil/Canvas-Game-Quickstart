/**
* Handles game rounds
*/
"use strict";

define(function (require) {

	var GameManager = require("app/GameManager");
	var HUD = require("app/HUD");

	var round = 0;
	var roundDurationSeconds = 10;
	var currentRoundTimeout;

	function update(dt) {
		if(round === 0) {
			nextRound();
		}
		currentRoundTimeout -= dt;

		if(currentRoundTimeout <= 0) {
			nextRound();
		}
	}

	function nextRound() {
		currentRoundTimeout = roundDurationSeconds;
		round += 1;
		GameManager.onNextRound(round);
	}

	function render() {
		// Render countdown and round number
		HUD.renderGameRound(round, currentRoundTimeout);
	}

	return {
		update: update,
		render: render
	};

});
