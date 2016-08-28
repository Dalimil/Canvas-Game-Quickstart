"use strict";

define(function(require) {

	var AssetLoader = require("app/AssetLoader");

	var AudioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// Later connect everything to our masterVolume gain node
	var masterVolume = AudioCtx.createGain();
	masterVolume.gain.value = 1.0;
	masterVolume.connect(AudioCtx.destination); 

	function Audio(filename, volume, loop) {
		this.filename = Audio.FILE_PREFIX + filename;
		this.source = null;
		this.buffer = null;
		this.volume = volume;
		this.loop = loop || false;
		this.gain = AudioCtx.createGain();
		this.gain.gain.value = this.volume; // Set volume levels -> [0, 1] - 0 is mute

		this.initSource = function() {
			// Assumes we already have a buffer loaded
			this.source = AudioCtx.createBufferSource();
			this.source.buffer = this.buffer;
			this.source.loop = this.loop;
			this.source.connect(this.gain);
			this.gain.connect(masterVolume);
		};

		this.loadBuffer = function(callback) {
			var request = new XMLHttpRequest();
			request.open('GET', this.filename, true);
			request.responseType = 'arraybuffer';
			var self = this;

			request.onload = function() {
				AudioCtx.decodeAudioData(request.response, function(buffer) {
					self.buffer = buffer;
					callback();
				}, function(error) { 
					console.error("Audio data decoding error", error); 
					callback();
				});
			};
			request.send();
		};

		this.play = function() {
			this.initSource();
			var currentTime = AudioCtx.currentTime;
			this.source.start(); // start(when, offset, duration)
			// Fade-in volume - todo - fix
			//gainAmbient.gain.setValueAtTime(0, currentTime + 1);
			//gainAmbient.gain.exponentialRampToValueAtTime(volumeAmbient, currentTime + 4);
		};

		this.stop = function() {
			this.source.stop();
		};
	}

	Audio.FILE_PREFIX = 'audio/';

	var audioBuffers = {
		"menu": new Audio('ambient-menu-playful.ogg', 0.7, true),
		"gunshot": new Audio('effects/gunshot.wav', 0.3)
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

	function setMasterVolume(value) {
		masterVolume.gain.value = value;
	}

	function mute() {
		setMasterVolume(0);
	}

	function unmute() {
		setMasterVolume(1);
	}

	function isMuted() {
		return masterVolume.gain.value == 0;
	}

	return {
		init: init,
		play: play,
		stop: stop,
		mute: mute,
		unmute: unmute,
		isMuted: isMuted
	};

});
