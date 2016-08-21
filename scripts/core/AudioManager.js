"use strict";

define(function(require) {

	var AssetLoader = require("app/AssetLoader");

	var AudioCtx = new (window.AudioContext || window.webkitAudioContext)();

	function Audio(filename, volume, loop) {
		this.filename = Audio.FILE_PREFIX + filename;
		this.source = null;
		this.volume = volume;
		this.loop = loop || false;
		this.gain = AudioCtx.createGain();
		this.gain.value = this.volume; // Set volume levels -> [0, 1] - 0 is mute

		this.initSource = function(buffer) {
			this.source = AudioCtx.createBufferSource();
			this.source.buffer = buffer;
			this.source.loop = this.loop;
			this.source.connect(this.gain);
			this.gain.connect(AudioCtx.destination);
		};

		this.loadBuffer = function(callback) {
			var request = new XMLHttpRequest();
			request.open('GET', this.filename, true);
			request.responseType = 'arraybuffer';
			var self = this;

			request.onload = function() {
				AudioCtx.decodeAudioData(request.response, function(buffer) {
					self.initSource(buffer);
					callback();
				}, function(error) { 
					console.error("Audio data decoding error", error); 
					callback();
				});
			};
			request.send();
		};

		this.play = function() {
			var currentTime = AudioCtx.currentTime;
			//gainAmbient.gain.setValueAtTime(0, currentTime + 1);
			this.source.start(currentTime + 1); // start(when, offset, duration)
			// Fade-in volume - todo - fix
			//gainAmbient.gain.exponentialRampToValueAtTime(volumeAmbient, currentTime + 4);
		};

		this.stop = function() {
			this.source.stop();
		};
	}

	Audio.FILE_PREFIX = 'audio/';

	var audioBuffers = {
		"menu": new Audio('ambient-menu-playful.ogg', 0.7, true),
		"gunshot": new Audio('effects/gunshot.wav', 0.8)
	};

	function init() {
		// Register our load function
		AssetLoader.addLoadFunction(load, Object.keys(audioBuffers).length);
	}

	function load(tickCallback) {
		Object.keys(audioBuffers).forEach(function(key) {
			audioBuffers[key].loadBuffer(tickCallback);
		});
	}

	function play(audioKey) {
		audioBuffers[audioKey].play();
	}

	function stop(audioKey) {
		audioBuffers[audioKey].stop();
	}

	return {
		init: init,
		play: play,
		stop: stop
	};

});
