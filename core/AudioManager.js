var AudioManager = (function() {

	var offset = 0;
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	var source = audioCtx.createMediaElementSource(myAudio);
	// Create a gain node
	var gainNode = audioCtx.createGain();
	gainNode.gain.value = 1; // [0, 1] - 0 is mute

	// connect the AudioBufferSourceNode to the gainNode
	// and the gainNode to the destination, so we can play the
	// music and adjust the volume dynamically
	source.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// Add fading (linearRamp) and check out all filters on MDN


	if (offset == 0) {
		source.start();
		offset = context.currentTime;
	} else {
		source.start(0, context.currentTime - offset);
	}


	function load() {
		//
	}
	AssetLoader.addLoadFunction(load);
	return {
	};

})();



/////////////////////


function getData() {
  source = audioCtx.createBufferSource();
  var request = new XMLHttpRequest();
  request.open('GET', 'guitar.ogg', true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;

        source.connect(audioCtx.destination);
        source.loop = true;
      },

      function(e){"Error with decoding audio data" + e.err});

  }

  request.send();
}
