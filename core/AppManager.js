/**
* Initializes the game loop and pause/unpause events
*/
var AppManager = (function() {

    var running = false;
    var lastTimestamp;
    var requestAnimFrame = Utils.getRequestAnimationFrame(); // cross-browser

    $(window).on("load", init); // onload

    function init() {
        // Initialize components by passing the canvas object
        var $canvas = $("#canvas");
        GameManager.init($canvas[0]);
        GameInput.init($canvas);
        AssetLoader.init($canvas);

        // Don't run the game when the tab isn't visible
        $(window).on("focus", unpause);
        $(window).on("blur", pause);
    }

    function pause() {
        running = false;
    }

    function unpause() {
        if(AssetLoader.isLoaded()) {
            running = true;
            lastTimestamp = performance.now();
            requestAnimFrame(main);
        }
    }

    // The main game loop
    // @param timestamp - DOMHighResTimeStamp
    function main(timestamp) {
        if(!running) {
            return;
        }
        requestAnimFrame(main); // Best practice (Mozilla)

        var delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp; // ready for the next frame
        
        GameManager.update(delta);
        GameManager.render();
    }

    return {
        pause: pause,
        unpause: unpause,
        isRunning: function() { return running; }
    };

})();
