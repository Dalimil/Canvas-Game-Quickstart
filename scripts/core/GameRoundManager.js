/**
* Handles game rounds
*/
"use strict";

define(function (require) {

	var round = 0;
	var roundDurationSeconds = 10;
	var currentRoundTimeout;

	var newRoundTransitionTime = 2;
	var roundTransitionTimeout;
	var inTransition = false;

	var onNextRoundCallback = null;

	function init(roundCallback) {
		onNextRoundCallback = roundCallback;
	}

	function update(dt) {
		if(round === 0) {
			nextRound();
		}

		if(inTransition) {
			// Transitioning into the next round
			// e.g. Showing cinematics :-)
			roundTransitionTimeout -= dt;

			if(roundTransitionTimeout <= 0) {
				inTransition = false;
			}
			return false; // Not ready for game update
		} 

		// Not in transition - Round is active
		currentRoundTimeout -= dt;

		if(currentRoundTimeout <= 0) {
			nextRound();
		}
		return true; // Ready for game update
	}

	function nextRound() {
		roundTransitionTimeout = newRoundTransitionTime;
		inTransition = true;
		currentRoundTimeout = roundDurationSeconds;
		round += 1;
		onNextRoundCallback(round);
	}

	function isInTransition() {
		return inTransition;
	}

	function getRoundNumber() {
		return round;
	}

	function getRoundTimeRemaining() {
		return parseFloat(currentRoundTimeout.toFixed(1));
	}

	return {
		init: init,
		update: update,
		isInTransition: isInTransition,
		getRoundNumber: getRoundNumber,
		getRoundTimeRemaining: getRoundTimeRemaining
	};

});
