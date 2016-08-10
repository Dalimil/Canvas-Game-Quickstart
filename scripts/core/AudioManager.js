"use strict";

define(function(require) {

	var AssetLoader = require("app/AssetLoader");
	// Register our load function
	AssetLoader.addLoadFunction(load);

	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	/* Array entries will be replaced by audio buffers after load() */
	var audioBuffers = [
		'ambient-menu.ogg',
		'gunshot.wav'
	];
	var filePrefix = 'audio/';

	var sourceAmbient = null;
	var sourceGunshot = null;

	var volumeEffects = 0.9;
	var volumeAmbient = 0.7;

	var gainEffects = audioCtx.createGain();
	var gainAmbient = audioCtx.createGain();

	// Set volume levels -> [0, 1] - 0 is mute
	gainAmbient.gain.value = volumeAmbient; 
	gainEffects.gain.value = volumeEffects;


	function initSources() {
		sourceAmbient = audioCtx.createBufferSource();
		sourceAmbient.buffer = audioBuffers[0];
		sourceAmbient.loop = true;
		sourceAmbient.connect(gainAmbient);
		gainAmbient.connect(audioCtx.destination);

		sourceGunshot = audioCtx.createBufferSource();
		sourceGunshot.buffer = audioBuffers[1];
		sourceGunshot.connect(gainEffects);
		gainEffects.connect(audioCtx.destination);
	}

	// To be initialized in load()
	var singleBufferLoaded = function(fDone, fTick) {
		var totalPieces = audioBuffers.length;
		var numToLoad = totalPieces;

		function self() {
			numToLoad -= 1;
			fTick(totalPieces);

			if(numToLoad <= 0) { // All loaded
				initSources();
				fDone();
			}
		};

		return self;
	};

	function load(fDone, fTick) {
		singleBufferLoaded = singleBufferLoaded(fDone, fTick);

		$.each(audioBuffers, function(index, value) {
			loadBuffer(filePrefix + value, index);
		});
	}

	function loadBuffer(url, index) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			audioCtx.decodeAudioData(request.response, function(buffer) {
				audioBuffers[index] = buffer;
				singleBufferLoaded();
			}, function(error) { 
				console.error("Audio data decoding error", error); 
			});
		};

		request.send();
	}

	function playAmbient() {
		var currentTime = audioCtx.currentTime;
		//gainAmbient.gain.setValueAtTime(0, currentTime + 1);
		sourceAmbient.start(currentTime + 1); // start(when, offset, duration)
		// Fade-in volume - todo - fix
		//gainAmbient.gain.exponentialRampToValueAtTime(volumeAmbient, currentTime + 4);
	}

	function stopAmbient() {
		sourceAmbient.stop();
	}

	function playGunshot() {
		sourceGunshot.start();
	}

	return {
		playAmbient: playAmbient,
		stopAmbient: stopAmbient,
		playGunshot: playGunshot
	};

});
