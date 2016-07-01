/**
* Initializes the game loop and pause/unpause events
*/
window.onload = function() {
    // First initialize GameManager by passing the canvas object
    var canvas = $("#canvas")[0];
    GameManager.init(canvas);

    // A cross-browser requestAnimationFrame
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Don't run the game when the tab isn't visible
    $(window).on("focus", function() {
        unpause();
    });

    $(window).on("blur", function() {
        pause();
    });

    var running = false;
    var lastTimestamp;
    unpause(); // Play now!

    function pause() {
        running = false;
    }

    function unpause() {
        running = true;
        lastTimestamp = performance.now();
        requestAnimFrame(main);
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

};
